import pytest

from agenda import Agenda


def test_agenda_vacia():
    """Una agenda nueva debe estar vacía."""
    agenda = Agenda()

    assert len(agenda) == 0
    assert agenda.nombres() == []


def test_agregar_contacto():
    """Debe poder agregarse un contacto."""
    agenda = Agenda()

    agenda.agregar("Isaac", "3001234567")

    assert len(agenda) == 1
    assert agenda.contiene("Isaac")
    assert agenda.telefono_de("Isaac") == "3001234567"


def test_nombres_ordenados():
    """Los contactos deben mantenerse en orden alfabético."""
    agenda = Agenda()

    agenda.agregar("Pedro", "3001111111")
    agenda.agregar("Ana", "3002222222")
    agenda.agregar("Carlos", "3003333333")

    assert agenda.nombres() == ["Ana", "Carlos", "Pedro"]


def test_contiene_contacto_existente():
    """contiene debe devolver True si el contacto existe."""
    agenda = Agenda()

    agenda.agregar("Ana", "3001111111")

    assert agenda.contiene("Ana") is True


def test_contiene_contacto_inexistente():
    """contiene debe devolver False si el contacto no existe."""
    agenda = Agenda()

    agenda.agregar("Ana", "3001111111")

    assert agenda.contiene("Carlos") is False


def test_telefono_de_contacto():
    """telefono_de debe devolver el teléfono correcto."""
    agenda = Agenda()

    agenda.agregar("Ana", "3001111111")

    assert agenda.telefono_de("Ana") == "3001111111"


def test_nombre_repetido_actualiza_telefono():
    """Agregar un nombre existente debe actualizar su teléfono."""
    agenda = Agenda()

    agenda.agregar("Ana", "3001111111")
    agenda.agregar("Ana", "3119999999")

    assert len(agenda) == 1
    assert agenda.telefono_de("Ana") == "3119999999"


def test_nombre_vacio():
    """Un nombre vacío debe producir ValueError."""
    agenda = Agenda()

    with pytest.raises(ValueError):
        agenda.agregar("", "3001111111")


def test_telefono_se_guarda_como_texto():
    """El teléfono debe almacenarse como str."""
    agenda = Agenda()

    agenda.agregar("Ana", "3001111111")

    assert agenda.telefono_de("Ana") == "3001111111"
    assert isinstance(agenda.telefono_de("Ana"), str)


def test_telefono_de_inexistente():
    """Buscar el teléfono de un contacto inexistente debe producir KeyError."""
    agenda = Agenda()

    with pytest.raises(KeyError):
        agenda.telefono_de("Carlos")


def test_eliminar_contacto():
    """Debe poder eliminarse un contacto existente."""
    agenda = Agenda()

    agenda.agregar("Ana", "3001111111")
    agenda.agregar("Carlos", "3002222222")

    agenda.eliminar("Ana")

    assert len(agenda) == 1
    assert agenda.contiene("Ana") is False
    assert agenda.nombres() == ["Carlos"]


def test_eliminar_contacto_inexistente():
    """Eliminar un contacto inexistente debe producir KeyError."""
    agenda = Agenda()

    with pytest.raises(KeyError):
        agenda.eliminar("Carlos")


def test_nombres_devuelve_lista_independiente():
    """Modificar la lista de nombres no debe modificar la agenda."""
    agenda = Agenda()

    agenda.agregar("Ana", "3001111111")
    agenda.agregar("Carlos", "3002222222")

    nombres = agenda.nombres()
    nombres.clear()

    assert agenda.nombres() == ["Ana", "Carlos"]