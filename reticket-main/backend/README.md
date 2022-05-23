## Setting up the backend

### Running the first time

1. Set up virtual environment
   Make sure you are in the `backend` directory and run these commands:

   Mac:

   ```bash
   python3 -m virtualenv env
   source env/bin/activate
   pip install -r requirements.txt
   ```

   Windows:

   ```bash
   python -m venv env
   .\env\Scripts\activate
   pip install -r requirements.txt
   ```

2. Run migrations

   ```bash
   python manage.py migrate
   ```

3. Create a super user

   ```bash
   python manage.py createsuperuser
   ```

   **NB**: When you type your password, it might look like nothing is happening, but it is.

4. Start the server
   ```bash
   python manage.py runserver
   ```

The server should now be running at http://localhost:8000.
To see the admin panel go to http://localhost:8000/admin/.

### Running the next times

When you want to start the backend after pulling the latest code from the main branch, you have to repeat some of the steps.

1. Activate and update virtual environment
   Make sure you are in the `backend` directory and run these commands:

   Mac:

   ```bash
   source env/bin/activate
   pip install -r requirements.txt
   ```

   Windows:

   ```bash
   .\env\Scripts\activate
   pip install -r requirements.txt
   ```

2. Run migrations

   ```bash
   python manage.py migrate
   ```

3. Start the server
   ```bash
   python manage.py runserver
   ```

### Run and test automatically

It is possible to automatically run and test the backend in VSCode (after completing the steps above):

- In VSCode, go to the tab Run and Debug.
- Press the green "play" button at the top of the Run and Debug menu.

### Coverage

There exists a possibility to generate a coverage report for the backend which can be viewed in your browser.

- In the terminal in VSCode, cd to backend
- Run

```bash
coverage run --source='.' manage.py test
```

This will run the tests automatically and generate coverage data.

- Run

```bash
coverage html
```

- This will generate or update the folder called 'htmlcov' in backend.
- Navigate to this folder and find the file named
  'index.html'. Open this file in your browser.

This will show the coverage report. Generally, we should not aim for 100% coverage, but rather a high degree. A lot of files are not necessary to test, but apps that we crate should be tested. A coverage of approx. 90% will be a very high degree of coverage.
