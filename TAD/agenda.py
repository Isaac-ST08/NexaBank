class Agenda:
    """TAD que administra contactos ordenados alfabéticamente"""

    def __init__(self) -> None:
        """
        Crea una agenda vacía
        Complejidad: O(1)
        """
        self.__contactos: list[tuple[str, str]] = []

    def __len__(self) -> int:
        """
        Devuelve la cantidad de contactos de la agenda
        Complejidad: O(1)
        """
        return len(self.__contactos)

    def __buscar(self, nombre: str) -> int:
        """
        Busca un nombre mediante búsqueda binaria
        Devuelve el índice donde se encuentra el nombre.
        Si no existe, devuelve el índice donde debería insertarse.

        Complejidad: O(log n)
        """

        izquierda = 0
        derecha = len(self.__contactos)

        while izquierda < derecha:
            medio = (izquierda + derecha) // 2
            nombre_medio = self.__contactos[medio][0]

            if nombre_medio < nombre:
                izquierda = medio + 1
            else:
                derecha = medio

        return izquierda
