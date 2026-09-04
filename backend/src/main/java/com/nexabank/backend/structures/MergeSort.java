package com.nexabank.backend.structures;

public class MergeSort {

    public static void sort(int[] array) {
        sort(array, 0, array.length - 1);
    }

    public static void sort(int[] array, int inicio, int fin) {

        if (inicio >= fin) {
            return;
        }

        int medio = (inicio + fin) / 2;

        sort(array, inicio, medio);

        sort(array, medio + 1, fin);

        merge(array, inicio, medio, fin);
    }

    private static void merge(int[] array, int inicio, int medio, int fin) {
        int i = inicio;
        int j = medio + 1;
        int k = 0;
        int[]  aux = new int[fin - inicio + 1];
        while (i <= medio && j <= fin) {
            if (array[i] <= array[j]) {
                aux[k] = array[i];
                k++;
                i++;
            }
            else {
                aux[k] = array[j];
                k++;
                j++;
            }

        }
        while (i <= medio) {
            aux[k] = array[i];
            k++;
            i++;
        }
        while (j <= fin) {
            aux[k] = array[j];
            k++;
            j++;
        }
        for (int x = 0; x < aux.length; x++) {
            array[inicio + x] = aux[x];
        }
    }
}