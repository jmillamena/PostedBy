from sqlalchemy import DateTime, LargeBinary
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Table, Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import validates
from datetime import datetime

from config import db, bcrypt

# Models go here!

friendship_table = db.Table('friendships',
                            db.Column('user_id', db.Integer, db.ForeignKey(
                                'user.id'), primary_key=True),
                            db.Column('friend_id', db.Integer, db.ForeignKey('user.id'), primary_key=True))


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

    friendships = db.relationship('User', secondary=friendship_table,
                                  primaryjoin=(
                                      friendship_table.c.user_id == id),
                                  secondaryjoin=(
                                      friendship_table.c.friend_id == id),
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
