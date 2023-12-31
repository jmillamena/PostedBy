from sqlalchemy import DateTime, LargeBinary
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Table, Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import validates
from datetime import datetime

from config import db, bcrypt

# Models go here!

# friendship_table = db.Table('friendships',
#                             db.Column('user_id', db.Integer, db.ForeignKey(
#                                 'user.id'), primary_key=True),
#                             db.Column('friend_id', db.Integer, db.ForeignKey('user.id'), primary_key=True))


class Friendship(db.Model):
    __tablename__ = 'friendship-relationship'

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), primary_key=True)

    def __repr__(self):
        return f'<Friendship {self.user_id}, {self.friend_id}>'


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    hashed_password = db.Column(db.String(128), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "email": self.email
        }

    def set_password(self, password):
        self.hashed_password = bcrypt.generate_password_hash(
            password).decode('utf8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.hashed_password, password)

    @validates('name')
    def validate_name(self, key, name):
        if not isinstance(name, str):
            raise AssertionError('Name must be a string')
        if len(name) < 3:
            raise AssertionError('Name must be at least 3 characters long')
        return name

    @validates("email")
    def validate_email(self, key, email):
        if not isinstance(email, str):
            raise AssertionError("Email must be a string")
        if len(email) < 3:
            raise AssertionError("Email must be at least 3 characters long")
        return email

    @validates("username")
    def validate_username(self, key, username):
        if not isinstance(username, str):
            raise AssertionError("Username must be a string")
        if len(username) < 3:
            raise AssertionError("Username must be at least 3 characters long")
        return username

    # friendships = db.relationship('User', secondary=friendship_table,
    #                               primaryjoin=(
    #                                   friendship_table.c.user_id == id),
    #                               secondaryjoin=(
    #                                   friendship_table.c.friend_id == id),
    #                               backref=db.backref('friends', lazy='dynamic'), lazy='dynamic')

    friendships = db.relationship('User', secondary=Friendship.__table__,
                                  primaryjoin=(
                                      Friendship.user_id == id),
                                  secondaryjoin=(
                                      Friendship.friend_id == id),
                                  backref=db.backref('friends', lazy='dynamic'), lazy='dynamic')

    def __repr__(self):
        return f'(id={self.id}, name={self.name}, username={self.username}, email={self.email})'

    from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content_text = db.Column(db.Text)
    content_image = db.Column(db.String)
    timestamp = db.Column(DateTime, default=datetime.utcnow, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    recipient_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    author = db.relationship("User", backref="posts")
    author = db.relationship("User", foreign_keys=[
                             author_id], backref="authored_posts")
    recipient = db.relationship(
        "User", foreign_keys=[recipient_id], backref="received_posts")

    def to_dict(self):
        return {
            'id': self.id,
            'content_text': self.content_text,
            'content_image': self.content_image,
            'timestamp': self.timestamp.isoformat(),
            'author_id': self.author_id,
            'recipient_id': self.recipient_id,
            'author': self.author.to_dict() if self.author else None,
            'recipient': self.recipient.to_dict() if self.recipient else None
        }

    def __repr__(self):
        return f'<Post {self.content_text}, {self.content_image}, {self.timestamp}, {self.author}>'


class Comment(db.Model):
    __tablename__ = 'user_comments'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))

    user = db.relationship("User", backref="user_comments")
    post = db.relationship("Post", backref="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'timestamp': self.timestamp.isoformat(),
            'user_id': self.user_id,
            'post_id': self.post_id,
            'user': self.user.to_dict() if self.user else None,
            'post': self.post.to_dict() if self.post else None
        }

    def __repr__(self):
        return f'<Comment {self.content}, {self.timestamp}, {self.user}>'
