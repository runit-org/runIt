python manage.py migrate base zero
python manage.py flush --noinput
python manage.py makemigrations
python manage.py migrate
python manage.py seed
python manage.py runserver
