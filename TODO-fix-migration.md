# Fix Migration Conflict Plan
- [x] Identify cause: duplicate app files inside `api/migrations/`
- [ ] Delete extraneous files: `admin.py`, `apps.py`, `models.py`, `serializers.py`, `tests.py`, `urls.py`, `views.py`
- [ ] Delete nested `api/migrations/migrations/` directory
- [ ] Run `python manage.py makemigrations api` to verify
