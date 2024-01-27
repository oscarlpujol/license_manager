from database import db_session
from models import User, License #, Machine, Ownership,

import json
import os
import argparse

parser = argparse.ArgumentParser(description='Script para añadir usuarios, máquinas o propiedades a wolwebapp.')

parser.add_argument('--machines')
parser.add_argument('--users')
parser.add_argument('--owners')
parser.add_argument('--usermail')
parser.add_argument('--userpass')
parser.add_argument('--licenses')
parser.add_argument('--admin', action='store_true')

args = parser.parse_args()
cli_args = vars(args)

print(cli_args)

if cli_args['licenses']:
    lice_path = cli_args['licenses']
    if os.path.isfile(lice_path):
        with open(lice_path, 'r') as file:
            licenses = json.load(file)
            for license in licenses:
                new_license = License(email=license["email"], password=license["password"])
                db_session.add(new_license)
                db_session.commit()


if cli_args['machines']:
    mach_path = cli_args['machines']
    if os.path.isfile(mach_path):
        with open(mach_path, 'r') as file:
            machines = json.load(file)
            for machine in machines:
                new_machine = Machine(name=machine["name"], mac=machine["mac"], ip=machine["ip"], port=machine["port"])
                db_session.add(new_machine)
                db_session.commit()

if cli_args['users']:
    user_path = cli_args['users']
    if os.path.isfile(user_path):
        with open(user_path, 'r') as file:
            users = json.load(file)
            for user in users:
                new_user = User(email=user["email"], password=user["password"])
                db_session.add(new_user)
                db_session.commit()

if cli_args['owners']:
    owns_path = cli_args['owners']
    if os.path.isfile(owns_path):
        with open(owns_path, 'r') as file:
            ownerships = json.load(file)
            for ownership in ownerships:
                new_ownership = Ownership(machine_id = ownership["machine_id"], user_id = ownership["user_id"])
                db_session.add(new_ownership)
                db_session.commit()

if cli_args['usermail'] and cli_args['userpass']:
    mach_path = cli_args['machines']
    new_user = User(email=cli_args['usermail'], password=cli_args['userpass'])
    if cli_args['admin']:
        new_user.admin = True
    db_session.add(new_user)
    db_session.commit()
