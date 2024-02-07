from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime, Enum, func
from sqlalchemy.orm import relationship, backref
from werkzeug.security import generate_password_hash
from flask_login import UserMixin
from data.constans import roles, default_role, req_states, default_req_state
from database import Base

class User(UserMixin, Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = Column(String(100), unique=True)
    password = Column((String(100)))
    role = Column(Enum(*roles, name="roles"), default=default_role)
    admin = Column(Boolean, default=False)
    activated = Column(Boolean, default=False)

    # owns = relationship("Ownership", cascade="all, delete")

    def __init__(self, email, password):
        self.email = email
        self.password = generate_password_hash(password)
    
    def __repr__(self):
        user_json = {"id": self.id, "email": self.email, "password": self.password, "role": self.role, "admin": self.admin, "activated": self.activated}
        return str(user_json)

    def setAdmin(self,admin):
        self.admin = admin

    def setPassword(self,password):
        self.password = generate_password_hash(password)

class LoginCode(Base):
    __tablename__ = "logincodes"
    code = Column(String(100), primary_key=True)
    user_id = Column(String(100), ForeignKey("users.id"), nullable=False)
    creation_date = Column(DateTime, default=func.now())
    expiration_date = Column(DateTime)

    def __init__(self, code, user_id):
        self.code = code
        self.user_id = user_id


class Book(Base):
    __tablename__="books"
    isbn = Column(String(100), primary_key=True)
    title = Column(String(100))

    def __init__(self, isbn, title):
        self.isbn = isbn
        self.title = title

    def __repr__(self):
        book_json = {
            "ISBN" : self.isbn,
            "title" : self.title
        }
        return str(book_json)

class License(Base):
    __tablename__ = "licenses"
    code = Column(String(100), primary_key=True) # primary keys are required by SQLAlchemy
    book = Column(String(100), ForeignKey("books.isbn"), nullable=False)
    user_type = Column(String(100))
    functionality = Column(String(100))
    requested_by = Column(String(100), ForeignKey("requests.id"), nullable=True)
    expiration_date = Column(String(100))
    # timestamp_request ?

    def __init__(self, code, book,expiration_date):
        self.code = code
        self.book = book
        self.expiration_date = expiration_date

    def __repr__(self):
        license_json = {
            "code" : self.code,
            "ISBN" : self.book
        }
        return str(license_json)
    
    def setLicense(self, active):
        self.active = active


class Request(Base):
    __tablename__ = "requests"

    id = Column(String(100), primary_key=True, unique=True)
    user_id = Column(String(100), ForeignKey("users.id"), nullable=False)
    book_id = Column(String(100), ForeignKey("books.isbn"), nullable=False)
    num_req_licenses = Column(Integer, nullable=False) 
    timestamp = Column(DateTime, default=func.now())
    status = Column(Enum(*req_states), default=default_req_state)

    def __init__(self, user_id, book_id, num_req_licenses, status=default_req_state):
        self.user_id = user_id
        self.book_id = book_id
        self.num_req_licenses = num_req_licenses
        self.status = status

# class Machine(Base):
#     __tablename__ = 'machines'

#     id = Column(Integer, primary_key=True) # primary keys are required by SQLAlchemy
#     name = Column(String(100))
#     mac = Column(String(100))
#     ip = Column(String(100))
#     port = Column(String(100))

#     owned = relationship("Ownership", cascade="all, delete")

#     __table_args__ = (
#         UniqueConstraint('name', 'mac', 'ip', name='uq_machines_name_mac_ip'),
#     )
   
#     def __init__(self, name, mac, ip, port):
#         self.name = name
#         self.mac = mac
#         self.ip = ip
#         self.port = port

#     def __repr__(self):
#         machine_json = {"id": self.id, "name": self.name, "mac": self.mac, "ip": self.ip, "port": self.port}
#         return str(machine_json)


# class Ownership(Base):
#     __tablename__ = 'ownership'
#     id = Column(Integer, primary_key=True)
#     machine_id = Column("machine_id", Integer, ForeignKey("machines.id", ondelete="CASCADE"), nullable=False)
#     user_id = Column("user_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

#     __table_args__ = (
#         UniqueConstraint('machine_id', 'user_id', name='uq_owner_machine_user'),
#     )

#     def __init__(self, machine_id, user_id):
#         self.machine_id = machine_id
#         self.user_id = user_id

#     def __repr__(self):
#         owner_json = {"id": self.id, "machine_id": self.machine_id, "user_id": self.user_id}
#         return str(owner_json)
