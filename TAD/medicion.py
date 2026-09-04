import time
import statistics

from agenda import Agenda


def generar_nombres(cantidad: int) -> list[str]:
    """Genera nombres para las pruebas."""
    return [f"Contacto{i:07d}" for i in range(cantidad)]


def medir(funcion, repeticiones: int = 7) -> float:
    """Mide una función y devuelve la mediana en milisegundos."""
    tiempos = []

    for _ in range(repeticiones):
        inicio = time.perf_counter_ns()
        funcion()
        fin = time.perf_counter_ns()

        tiempos.append((fin - inicio) / 1_000_000)

    return statistics.median(tiempos)


def crear_agenda(nombres: list[str]) -> Agenda:
    """Crea una agenda con los nombres de prueba."""
    agenda = Agenda()

    for nombre in nombres:
        agenda.agregar(nombre, "3000000000")

    return agenda


def main() -> None:
    cantidades = [100, 1000, 10000, 50000]

    print("Resultados de las mediciones de Agenda")
    print("-" * 80)
    print(
        "n | agregar | contiene | telefono | nombres | eliminar 1000"
    )
    print("-" * 80)

    for n in cantidades:
        nombres = generar_nombres(n)
        agenda = crear_agenda(nombres)

        existente = nombres[n // 2]
        inexistente = f"Contacto{n + 1:07d}"

        def prueba_agregar():
            prueba = Agenda()

            for nombre in nombres:
                prueba.agregar(nombre, "3000000000")

        def prueba_contiene():
            for _ in range(1000):
                agenda.contiene(existente)

        def prueba_telefono():
            for _ in range(1000):
                agenda.telefono_de(existente)

        def prueba_nombres():
            agenda.nombres()

        def prueba_eliminar():
            prueba = crear_agenda(nombres)

            for nombre in reversed(nombres[:1000]):
                prueba.eliminar(nombre)

        tiempo_agregar = medir(prueba_agregar, 5)
        tiempo_contiene = medir(prueba_contiene) / 1000
        tiempo_no_encontrado = medir(
            lambda: [agenda.contiene(inexistente) for _ in range(1000)]
        ) / 1000
        tiempo_telefono = medir(prueba_telefono) / 1000
        tiempo_nombres = medir(prueba_nombres)
        tiempo_eliminar = medir(prueba_eliminar, 3)

        print(
            f"{n:>5} | "
            f"{tiempo_agregar:>8.3f} | "
            f"{tiempo_contiene:>9.6f} | "
            f"{tiempo_telefono:>8.6f} | "
            f"{tiempo_nombres:>8.3f} | "
            f"{tiempo_eliminar:>13.3f}"
        )

        print(f"  contiene (nombre inexistente): {tiempo_no_encontrado:.6f} ms")


if __name__ == "__main__":
    main()
