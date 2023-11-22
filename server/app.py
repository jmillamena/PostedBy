#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User

# Views go here!


@app.route('/')
def index():
    return '<h1>Hello, Welcome to Posted By</h1>'


class Users(Resource):
    def get(self):
        users = User.query.all()
        return jsonify({"users": [user.to_dict() for user in users]})


api.add_resource(Users, "/users")

if __name__ == '__main__':
    app.run(port=5555, debug=True)
