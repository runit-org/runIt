rm db.sqlite3
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
python3 manage.py loaddata seeds/seed1.json
