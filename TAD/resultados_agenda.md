# Resultados de las mediciones

## 1. ¿Qué estamos midiendo?

En esta medición usamos directamente el TAD `Agenda` que hicimos para el proyecto. La agenda guarda los contactos en una lista y los mantiene ordenados alfabéticamente.

La idea de la medición es probar cómo se comportan las operaciones cuando la cantidad de contactos aumenta. Para esto usamos 100, 1.000, 10.000 y 50.000 contactos.

Las mediciones se hicieron con `time.perf_counter_ns()` de Python y se tomó la mediana de varias ejecuciones.

## 2. Resultados

Los tiempos están en milisegundos. En `contiene` y `telefono_de` se hizo la operación 1.000 veces y se muestra el tiempo aproximado de una sola búsqueda.

| Contactos | Agregar todos | Contiene | Teléfono | Nombres | Eliminar 1000 |
|---:|---:|---:|---:|---:|---:|
| 100 | 0.051 ms | 0.000580 ms | 0.000588 ms | 0.002 ms | 0.106 ms |
| 1.000 | 0.907 ms | 0.001010 ms | 0.001028 ms | 0.015 ms | 1.889 ms |
| 10.000 | 13.596 ms | 0.001410 ms | 0.001436 ms | 0.125 ms | 15.944 ms |
| 50.000 | 86.463 ms | 0.001998 ms | 0.001842 ms | 0.623 ms | 88.749 ms |

## 3. ¿Qué pasó con cada operación?

### Agregar

El tiempo para agregar todos los contactos aumenta cuando aumenta la cantidad de datos.

Aunque `_buscar` utiliza búsqueda binaria y es O(log n), cuando se agrega un contacto en una posición intermedia la lista tiene que mover elementos. Por eso `agregar` termina siendo O(n).

En esta prueba los nombres se agregaron en orden, así que la mayoría de las veces se agregaron al final. Aun así, la operación está diseñada para mantener el orden de la agenda.

### Contiene

La búsqueda de un contacto fue bastante rápida incluso cuando llegamos a 50.000 contactos.

Esto se debe a que `contiene` utiliza `_buscar`, que hace una búsqueda binaria. Su complejidad es O(log n).

También se probó buscar un nombre que no existe y el resultado fue parecido.

### Teléfono

`telefono_de` también utiliza `_buscar`, por lo que su complejidad es O(log n).

Los tiempos fueron muy pequeños y aumentaron poco al pasar de 100 a 50.000 contactos.

### Nombres

La operación `nombres()` recorre todos los contactos para crear una nueva lista. Por eso su complejidad es O(n).

Se puede ver en los resultados que el tiempo aumenta conforme aumenta la cantidad de contactos.

### Eliminar

Para eliminar primero se hace una búsqueda binaria, pero después `pop()` puede tener que mover los elementos que están después del contacto eliminado.

Por eso la operación completa es O(n).

En la medición eliminamos 1.000 contactos para poder comparar los diferentes tamaños de agenda.

## 4. Algo importante que encontramos

Una cosa que nos parece importante es que tener una búsqueda binaria no significa que todas las operaciones sean O(log n).

La agenda sí puede encontrar rápidamente la posición de un contacto gracias a `_buscar`, pero cuando hay que insertar o eliminar dentro de la lista pueden tener que moverse varios elementos.

Por eso en el código tenemos:

- `_buscar`: O(log n)
- `contiene`: O(log n)
- `telefono_de`: O(log n)
- `nombres`: O(n)
- `agregar`: O(n)
- `eliminar`: O(n)
- `len`: O(1)

Esto coincide con las complejidades que están documentadas en el TAD.

## 5. Conclusión

Con las pruebas pudimos comprobar que las búsquedas son rápidas porque estamos usando búsqueda binaria y los contactos se mantienen ordenados.

También vimos que las operaciones de agregar y eliminar pueden tardar más porque la lista tiene que mantener los elementos en orden.

A medida que aumentamos la cantidad de contactos, `nombres()` también tarda más porque tiene que recorrer todos los elementos.

Estas mediciones nos sirven como punto de partida. Si después modificamos la implementación de `Agenda`, podemos volver a ejecutar `medicion.py` y comparar si realmente mejoró el rendimiento.
