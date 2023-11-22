from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Table, Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import validates

from config import db, bcrypt

# Models go here!


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

    def __repr__(self):
        return f'(id={self.id}, name={self.name}, username={self.username}, email={self.email})'
