A Django Web Application

Developer to know:
- A developer should git ignore a environment file
- A developer should push code to own branch first until the module is completed
- A developer should clear the migration files before push to relative branches
- A developer should use own sqlite database for first sprint development to avoid migration issues
- A developer should push code to own branch first until the module is completed
- A developer should always add the pip library to requirements.txt if new pip install was being performed
- A developer should always refer to database ERD for linking primary key or secondary key in the app's models.py

Git Basic:
## Setup
To clone and run this application, you'll need Git and Python installed on your computer. From your command line:

```bash
$ git clone then with the link
```
Create a virtual environment to install dependencies in and activate it:

```bash 
$ py -m venv env

$ env\Scripts\activate - Windows
$ source env/bin/activate - Linux
```
Then install the dependencies:

```bash
(env)$ pip install -r requirements.txt
```
Note the `(env)` in front of the prompt. This indicates that this terminal session operates in a virtual environment set up by `virtualenv2.`

## Usage 
After finish downloading the dependencies, you can now run the development server:

```bash 
(env)$ py manage.py runserver
```
And navigate to `http://127.0.0.1:8000/`.

## pip intall
To push your pip install library to requirements.txt
This will be overwriting the pip library inside and follow the current version a developer has from the developer's environment
```bash 
(env)$ pip freeze > requirements.txt
```

Install all libraries in one shot from current requirements.txt file
```bash 
(env)$ pip install -r requirements.txt
```

## Contribute
Contributions are only allowed by members of the Dev Team, New Contributions are required to perform the following:
1. Clone the project
2. Create your feature branch (git checkout -b feature/ProjectName)
3. Commit your changes (git commit -m 'Add new feature')
4. Push to the branch (git push origin feature/ProjectName)
5. Open a pull request to be reviewed

## Technology Stack
### Front-end
ReactJS in typescript

### Back-end
Django==3.12.1

## Database
Refer to Page 2 Tab instead
<!-- no database is designed yet -->

## Production
Here is a working live production site:\
//to be confirmed

--created by Angelyn when she was the project manager for one of her project--
