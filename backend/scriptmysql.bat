python3 manage.py migrate base zero
python3 manage.py flush --noinput
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py seed
python3 manage.py runserver
