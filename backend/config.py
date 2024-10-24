import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration."""
    DB_HOST = os.getenv('DB_HOST')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_NAME = os.getenv('DB_NAME')
    DB_PORT = os.getenv('DB_PORT')

    # Construct the database URI
    SQLALCHEMY_DATABASE_URI = (
        f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
    ) or 'postgresql://notetakingappdb_4xbj_user:AJ83KIlWBeg7GhqGIp6mNVS9ebM1wdY1@dpg-csd0rirv2p9s73fppatg-a.oregon-postgres.render.com/notetakingappdb_4xbj'
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY') or 'b938eed8627bfeb4563583f22d78e727'
    
    SESSION_TYPE = 'filesystem'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
