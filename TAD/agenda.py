class Agenda:
    """TAD que administra contactos ordenados alfabéticamente"""

    def __init__(self) -> None:
        """
        Crea una agenda vacía
        Complejidad: O(1)
        """
        self._contactos: list[tuple[str, str]] = []

    def __len__(self) -> int:
        """
        Devuelve la cantidad de contactos de la agenda
        Complejidad: O(1)
        """
        return len(self._contactos)

    def _buscar(self, nombre: str) -> int:
        """
        Busca un nombre mediante búsqueda binaria
        Devuelve el índice donde se encuentra el nombre.
        Si no existe, devuelve el índice donde debería insertarse.

        Complejidad: O(log n)
        """

        izquierda = 0
        derecha = len(self._contactos)

        while izquierda < derecha:
            medio = (izquierda + derecha) // 2
            nombre_medio = self._contactos[medio][0]

            if nombre_medio < nombre:
                izquierda = medio + 1
            else:
                derecha = medio

        return izquierda

    def contiene(self, nombre: str) -> bool:
        """
        Indica si un nombre está en la agenda
        Complejidad: O(log n)
        """

        posicion = self._buscar(nombre)

        return (
            posicion < len(self._contactos)
            and self._contactos[posicion][0] == nombre
        )

    def telefono_de(self, nombre: str) -> str:
        """
        Devuelve el teléfono asociado a un nombre
        Lanza KeyError si el nombre no existe

        Complejidad: O(log n)
        """

        posicion = self._buscar(nombre)

        if (
            posicion >= len(self._contactos)
            or self._contactos[posicion][0] != nombre
        ):
            raise KeyError(nombre)

        return self._contactos[posicion][1]

    def nombres(self) -> list[str]:
        """Devuelve todos los nombres en orden alfabético.

        La lista devuelta es independiente de la agenda.

        Complejidad: O(n)
        """
        return [contacto[0] for contacto in self._contactos]

    def agregar(self, nombre: str, telefono: str) -> None:
        """Agrega o actualiza un contacto.

        Si el nombre ya existe, actualiza su teléfono.
        Si el nombre está vacío, lanza ValueError.
        El teléfono se almacena como texto.

        Complejidad: O(n)
        """
        if nombre == "":
            raise ValueError("El nombre no puede estar vacío")

        telefono = str(telefono)
        posicion = self._buscar(nombre)

        if (
            posicion < len(self._contactos)
            and self._contactos[posicion][0] == nombre
        ):
            self._contactos[posicion] = (nombre, telefono)
        else:
            self._contactos.insert(posicion, (nombre, telefono))

    def eliminar(self, nombre: str) -> None:
        """Elimina un contacto de la agenda.

        Lanza KeyError si el nombre no existe.

        Complejidad: O(n)
        """
        posicion = self._buscar(nombre)

        if (
            posicion >= len(self._contactos)
            or self._contactos[posicion][0] != nombre
        ):
            raise KeyError(nombre)

        self._contactos.pop(posicion)