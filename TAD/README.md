# TAD Agenda
Es una implementación en Python del Tipo de Dato Abstracto (TAD) Agenda, que gestiona contactos (nombre y teléfono) ordenados alfabéticamente mediante búsqueda binaria.
## Uso
Importa la clase desde tu código: `from agenda import Agenda`.
O pruébala desde la terminal con: `python -c "from agenda import Agenda; a = Agenda(); a.agregar('Ana', '3001112233'); print(a.nombres())"`.
## Pruebas
Instala las dependencias con `pip install -r requeriments.txt`.
Ejecuta las pruebas unitarias corriendo: `python -m pytest test_agenda.py`.
