import os

from main import app, scheduler

if __name__ == '__main__':
    PORT = os.environ.get('PORT') if os.environ.get('PORT') else 3000
    if os.environ.get('ENV') == "development":
        app.run(host='127.0.0.1', port=PORT, debug=True)
    else:
        app.run()