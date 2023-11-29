#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify
from flask_restful import Resource, reqparse

# Local imports
from config import app, db, api, bcrypt
# Add your model imports
from models import User, Post
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jti, create_refresh_token
from werkzeug.datastructures import FileStorage
# Views go here!

jwt = JWTManager(app)

blacklist = set()

parser = reqparse.RequestParser()
parser.add_argument('content_text', type=str, help='Text content of the post')
parser.add_argument('recipient_id', type=int, help='Recipient ID of the post')
parser.add_argument('content_image', type=str,
                    help='Image content of the post')


@app.route('/')
def index():
    return '<h1>Hello, Welcome to Posted By</h1>'


class Users(Resource):
    def get(self):
        users = User.query.all()
        return jsonify({"users": [user.to_dict() for user in users]})

    def post(self):
        data = request.get_json()
        name = data['name']
        email = data['email']
        username = data['username']
        password = data['password']

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return ({'message': 'Email already associated with another account.'}, 400)

        user = User(name=name, email=email, username=username)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        return ({'message': 'User created successfully!'}, 201)


api.add_resource(Users, "/users")


class TokenRefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        return {"access_token": access_token}, 200


api.add_resource(TokenRefreshResource, "/token/refresh")

#


class LoginResource(Resource):
    def post(self):
        identifier = request.json.get('identifier', None)
        password = request.json.get('password', None)
        user = User.query.filter((User.email == identifier) | (
            User.username == identifier)).first()

        if user and user.check_password(password):
            access_token = create_access_token(identity=user.email)
            refresh_token = create_refresh_token(identity=user.email)
            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user_name": user.name,
                "username": user.username,
                "user_id": user.id
            }, 200
        return {"message": "Invalid email, username, or password."}, 401


api.add_resource(LoginResource, "/login")


# class LogoutResource(Resource):
#     @jwt_required()
#     def post(self):
#         # Extracting the access token from the Authorization header
#         auth_header = request.headers.get("Authorization")
#         if not auth_header or "Bearer " not in auth_header:
#             return {"message": "Missing or invalid token"}, 400

#         access_token = auth_header.split(" ")[1]

#         # Blacklist the access token
#         jti_access = get_jti(access_token)
#         blacklist.add(jti_access)

#         # If the refresh token is provided in the request's JSON, blacklist it as well
#         refresh_token = request.json.get('refresh_token', None)
#         if refresh_token:
#             jti_refresh = get_jti(refresh_token)
#             blacklist.add(jti_refresh)

#         return {"message": "Successfully logged out."}, 200

class LogoutResource(Resource):
    @jwt_required()
    def post(self):

        auth_header = request.headers.get("Authorization")
        if not auth_header or "Bearer " not in auth_header:
            return {"message": "Missing or invalid token"}, 400

        access_token = auth_header.split(" ")[1]

        # Blacklist the access token
        jti_access = get_jti(access_token)
        blacklist.add(jti_access)

        # If the refresh token is provided in the request's JSON, blacklist it as well
        refresh_token = request.json.get('refresh_token', None)
        if refresh_token:
            jti_refresh = get_jti(refresh_token)
            blacklist.add(jti_refresh)

        return {"message": "Successfully logged out."}, 200


api.add_resource(LogoutResource, '/logout')


class Friends(Resource):
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        friends = user.friends.all()
        friends_data = [{'id': friend.id, 'username': friend.username}
                        for friend in friends]
        return jsonify({'friends': friends_data})

    def post(self, user_id):
        data = request.get_json()
        friend_id = data.get('friend_id')

        user = User.query.get_or_404(user_id)
        friend = User.query.get_or_404(friend_id)

        # Check if the friendship already exists
        if friend in user.friends:
            return {'message': 'Friendship already exists.'}, 400

        # Add the friend to the user's friends
        user.friends.append(friend)
        db.session.commit()

        return {'message': f'{friend.username} is now your friend.'}, 201


api.add_resource(Friends, "/users/<int:user_id>/friends")


class GetFriends(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_id).first()

        friends = current_user.friends.all()
        friends_data = [{'id': friend.id, 'username': friend.username}
                        for friend in friends]
        return jsonify({'friends': friends_data})


api.add_resource(GetFriends, "/friends")


class UserProfile(Resource):
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        user_data = {'id': user.id,
                     'username': user.username, 'email': user.email}
        return jsonify({'user': user_data})


api.add_resource(UserProfile, "/users/<int:user_id>")


class PostsByAuthorResource(Resource):
    def get(self):
        author_id = request.args.get('author_id')
        if author_id is None:
            return {'error': 'Missing author_id parameter'}, 400

        # Fetch posts based on the author_id
        posts = Post.query.filter_by(author_id=author_id).all()

        # Return a list of posts
        return [{'id': post.id, 'content_text': post.content_text, 'timestamp': post.timestamp.isoformat()} for post in posts]


# Add the resource to the API
api.add_resource(PostsByAuthorResource, '/posts')


class PostResource(Resource):
    @jwt_required()
    def post(self):
        args = parser.parse_args()
        current_user_id = get_jwt_identity()

        # Fetch the current user (author) based on the access token
        current_user = User.query.filter_by(email=current_user_id).first()

        # 'recipient_id' is present in args
        recipient_id = args.get('recipient_id')
        if recipient_id is None:
            return {'message': 'Recipient ID is required'}, 400

        # Fetch the recipient user (friend) based on the recipient_id
        recipient_user = User.query.get(recipient_id)

        if not recipient_user:
            return {'message': 'Recipient not found'}, 404

        #  'content_image'  in args
        content_image_url = args.get('content_image', None)

        # Create a post with both the current user as the author and the recipient user
        new_post = Post(
            content_text=args['content_text'],
            content_image=content_image_url,
            author=current_user,
            recipient=recipient_user  # Set the recipient of the post
        )

        db.session.add(new_post)
        db.session.commit()

        return {'message': 'Post created successfully', 'post': new_post.to_dict()}, 201


api.add_resource(PostResource, '/posts')


class GetPostsByRecipient(Resource):
    @jwt_required()
    def get(self, recipient_id):

        current_user_id = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_id).first()

        if recipient_id is None:
            return {'message': 'Recipient ID is required'}, 400

        # Fetch the recipient_id
        recipient_user = User.query.get(recipient_id)

        if not recipient_user:
            return {'message': 'Recipient not found'}, 404

        posts = Post.query.filter_by(recipient=recipient_user).all()

        posts_data = [post.to_dict() for post in posts]

        return jsonify({'posts': posts_data})


api.add_resource(GetPostsByRecipient,
                 '/getpostsbyrecipient/<int:recipient_id>')


class GetPostsByUserId(Resource):
    @jwt_required()
    def get(self, user_id):
        # Get the currently logged-in user's identity
        current_user_id = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_id).first()

        # Ensure the user_id is not provided or matches the logged-in user's ID
        if user_id is not None and user_id != current_user.id:
            return {'message': 'Unauthorized access to posts'}, 403

        # Fetch posts based on the logged-in user's ID (recipient ID)
        posts = Post.query.filter_by(recipient=current_user).all()

        posts_data = [post.to_dict() for post in posts]

        return jsonify({'posts': posts_data})


# Register the new route
api.add_resource(GetPostsByUserId, '/getpostsbyuserid/<int:user_id>')

# path for users to edit posts they created


class GetPostsByAuthorId(Resource):
    @jwt_required()
    def get(self, author_id):
        # Get the currently logged-in user's identity
        current_user_id = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_id).first()

        # Ensure the author_id matches the logged-in user's ID
        if author_id is not None and author_id != current_user.id:
            return {'message': 'Unauthorized access to posts'}, 403

        # Fetch posts based on the logged-in user's ID (author ID)
        posts = Post.query.filter_by(author=current_user).all()

        posts_data = [post.to_dict() for post in posts]

        return jsonify({'posts': posts_data})


# Register the new route
api.add_resource(GetPostsByAuthorId, '/getpostsbyauthorid/<int:author_id>')


class DeletePost(Resource):
    @jwt_required()
    def delete(self, post_id):
        # Get the currently logged-in user's identity
        current_user_id = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_id).first()

        # Get the post by ID
        post = Post.query.get(post_id)

        # Check if the post exists and if the author matches the logged-in user
        if not post or post.author != current_user:
            return {'message': 'Unauthorized access to delete post'}, 403

        # Delete the post
        db.session.delete(post)
        db.session.commit()

        return {'message': 'Post deleted successfully'}


api.add_resource(DeletePost, '/deletepost/<int:post_id>')


# class EditPost(Resource):
#     @jwt_required()
#     def patch(self, post_id):
#         # Get the currently logged-in user's identity
#         current_user_id = get_jwt_identity()
#         current_user = User.query.filter_by(email=current_user_id).first()

#         # Get the post by ID
#         post = Post.query.get(post_id)

#         # Check if the post exists and if the author matches the logged-in user
#         if not post or post.author != current_user:
#             return {'message': 'Unauthorized access to edit post'}, 403

#         # Extract data from the request
#         data = request.get_json()

#         # Update the post fields with the new data
#         if 'content_text' in data:
#             post.content_text = data['content_text']
#         # Add more fields as needed

#         # Commit the changes to the database
#         db.session.commit()

#         return {'message': 'Post edited successfully'}


# # Register the new route
# api.add_resource(EditPost, '/editpost/<int:post_id>')

# with content_image
class EditPost(Resource):
    @jwt_required()
    def patch(self, post_id):
        # Get the currently logged-in user's identity
        current_user_id = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_id).first()

        # Get the post by ID
        post = Post.query.get(post_id)

        # Check if the post exists and if the author matches the logged-in user
        if not post or post.author != current_user:
            return {'message': 'Unauthorized access to edit post'}, 403

        # Extract data from the request
        data = request.get_json()

        # Update the post fields with the new data
        if 'content_text' in data:
            post.content_text = data['content_text']
        if 'content_image' in data:
            post.content_image = data['content_image']

        # Commit the changes to the database
        db.session.commit()

        return {'message': 'Post edited successfully'}


# Register the new route
api.add_resource(EditPost, '/editpost/<int:post_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
