#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api, bcrypt
# Add your model imports
from models import User
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jti, create_refresh_token

# Views go here!
jwt = JWTManager(app)

blacklist = set()


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


# class TokenRefreshResource(Resource):
#     @jwt_required(refresh=True)
#     def post(self):
#         current_user = get_jwt_identity()
#         access_token = create_access_token(identity=current_user)
#         return {"access_token": access_token}, 200


# api.add_resource(TokenRefreshResource, "/token/refresh")

class TokenRefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)

        # Check if the refresh token is blacklisted
        refresh_token = request.json.get('refresh_token', None)
        if refresh_token:
            jti_refresh = get_jti(refresh_token)
            if jti_refresh in blacklist:
                return {"message": "Refresh token is blacklisted"}, 401

        return {"access_token": access_token}, 200


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

if __name__ == '__main__':
    app.run(port=5555, debug=True)
