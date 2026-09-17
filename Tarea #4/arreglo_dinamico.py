import sys

class ArregloDinamico:
    """Implementación de un arreglo dinámico con redimensionamiento automático.
    
    - Estrategia de crecimiento: Duplica su capacidad al llenarse (O(1) amortizado).
    - Estrategia de reducción: Reduce la capacidad a la mitad si la ocupación
      baja al 25% para evitar desperdicio de memoria.
    """

    def __init__(self, capacidad_inicial=4):
        self._capacidad = capacidad_inicial
        self._tamano = 0
        self._datos = [None] * self._capacidad

    def __len__(self):
        """Retorna el número de elementos guardados.
        
        Complejidad: O(1)
        """
        return self._tamano

    def __getitem__(self, indice):
        """Obtiene un elemento dada su posición.
        
        Complejidad: O(1)
        """
        if not 0 <= indice < self._tamano:
            raise IndexError("Índice fuera de rango")
        return self._datos[indice]

    def _redimensionar(self, nueva_capacidad):
        """Crea un nuevo arreglo con la nueva capacidad y copia los elementos.
        
        Complejidad: O(n)
        """
        nuevos_datos = [None] * nueva_capacidad
        for i in range(self._tamano):
            nuevos_datos[i] = self._datos[i]
        self._datos = nuevos_datos
        self._capacidad = nueva_capacidad

    def agregar(self, elemento):
        """Agrega un elemento al final. Si se llena, duplica la capacidad.
        
        Complejidad: O(1) amortizado
        """
        if self._tamano == self._capacidad:
            self._redimensionar(2 * self._capacidad)
        self._datos[self._tamano] = elemento
        self._tamano += 1

    def eliminar_ultimo(self):
        """Elimina y retorna el último elemento.
        
        Si el número de elementos cae al 25% de la capacidad, reduce la
        capacidad a la mitad (mantenimiento de un mínimo razonable de 4).
        
        Complejidad: O(1) amortizado
        """
        if self._tamano == 0:
            raise IndexError("El arreglo está vacío")
        
        valor = self._datos[self._tamano - 1]
        self._datos[self._tamano - 1] = None
        self._tamano -= 1

        # Criterio de reducción (25% de ocupación)
        if 0 < self._tamano <= self._capacidad // 4 and self._capacidad // 2 >= 4:
            self._redimensionar(self._capacidad // 2)

        return valor



# CÓDIGO DE PRUEBA / DEMOSTRACIÓN

if __name__ == "__main__":
    arr = ArregloDinamico(capacidad_inicial=4)
    print(f"Estado inicial -> Tamaño: {len(arr)}, Capacidad: {arr._capacidad}")

    # Llenado para forzar duplicación
    print("\n--- Agregando elementos ---")
    for i in range(1, 10):
        arr.agregar(i * 10)
        print(f"Agregado {i * 10} -> Tamaño: {len(arr)}, Capacidad: {arr._capacidad}")

    # Eliminado para probar reducción
    print("\n--- Eliminando elementos ---")
    while len(arr) > 0:
        val = arr.eliminar_ultimo()
        print(f"Eliminado {val} -> Tamaño: {len(arr)}, Capacidad: {arr._capacidad}")