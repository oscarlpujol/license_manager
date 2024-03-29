from flask import Blueprint, render_template, request, abort
from flask_login import login_required, current_user
from sqlalchemy import func
from sqlalchemy.orm import joinedload

from models import User, License, Request, Book #, Machine, Ownership,
import data.serverConfig as config
from data.constans import roles


views = Blueprint('views', __name__)

def currentVersion():
    with open('./.git/refs/heads/main') as version:
        return str(version.read()).strip()

@views.route('/', methods=['GET'])
@login_required
def index():
    if request.method == 'GET':
        if current_user.activated:
            #TODO: Hacer un Join de ambas tablas para que funcione
            books = (Book.query
                    .outerjoin(License, Book.isbn == License.isbn)
                    .with_entities(Book.title, Book.isbn, 
                                func.count(License.code) if current_user.admin else '')
                    .filter(License.requested_by.is_(None))
                    .group_by(License.isbn)
                    .all()
            )



            # machines = []
            # if hasattr(current_user, 'admin'):
            #     owner = Ownership.query.filter_by(user_id = current_user.id).all()
            #     for machine in owner:
            #         machines.append(Machine.query.get(machine.machine_id))
            return render_template('index.html', TITLE=config.TITLE, books=books, role=current_user.role, isAdmin=current_user.admin, currentVersion=currentVersion())
        else:
            return render_template('changePassword.html')

#TODO: Añadir Filtro. Ordenar alfabéticamente
@views.route('/licencias', methods=['GET'])
@login_required
def active_licenses():
    if current_user.admin:
        if request.method == 'GET':
            books = (License.query
                    .outerjoin(Book, Book.isbn == License.isbn)
                    .filter(License.requested_by.is_(None))
                    .with_entities(Book.title, License.isbn, func.count(License.code))
                    .group_by(License.isbn)
                    .all()
            )
            error = request.args.get('error')
            return render_template('books.html', TITLE=config.TITLE, books=books, isAdmin=current_user.admin, error=error)
    else:
        abort(403)


#TODO: Añadir vista gestión de solicitudes
@views.route('/solicitudes', methods=["GET"])
@login_required
def requests():
    if current_user.admin:
        if request.method == 'GET':
            requests = Request.query.options(joinedload(Request.user)).filter_by(status='En espera').all()
            return render_template('requests.html', requests=requests, TITLE=config.TITLE, isAdmin=current_user.admin)
    else:
        abort(403)

#TODO: Generarlo
@views.route('/admin', methods=["GET"])
@login_required
def management():
    if current_user.admin:
        if request.method == 'GET':
            return render_template('management.html', TITLE=config.TITLE, isAdmin=current_user.admin)
    else:
        abort(403)


# @views.route('/machines', methods=['GET'])
# @login_required
# def machines():
#     if current_user.admin:
#         if request.method == 'GET':
#             machines = Machine.query.all()
#             return render_template('machines.html', machines=machines, TITLE=config.TITLE, isAdmin=current_user.admin)  
#     else:
#         abort(403)

#TODO: Añadir cambiar rol al generar usuario
@views.route('/usuarios', methods=['GET'])
@login_required
def users():
    if current_user.admin:
        # Recupera los datos de todos los usuarios.
        if request.method == "GET":
            users = User.query.all()
            return render_template('users.html', users=users, roles=roles, TITLE=config.TITLE, isAdmin=current_user.admin, currentUserId=current_user.id)

    else:
        abort(403)


# @views.route('/users/<int:user_id>/machines', methods=['GET'])
# @login_required
# def user_machines(user_id):
#     if current_user.admin:
#         if request.method == 'GET':
#             machines = Machine.query.all()
#             ownerships = Ownership.query.filter_by(user_id=user_id).all()
#             user_email = User.query.get(user_id).email
#             owned_machines = []
#             for machine in ownerships:
#                 owned_machines.append(machine.machine_id)
#             return render_template('ownership.html', user_email=user_email, machines=machines, owned_machines=owned_machines, TITLE=config.TITLE, isAdmin=current_user.admin)
#     else:
#         abort(403)