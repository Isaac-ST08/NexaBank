package com.nexabank.backend.structures;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class MergeSortTest {
    @Test
    public void testMergeSort() {
        int[] array = {9, 8, 7, 6, 5, 4, 3, 2, 1, 0};

        MergeSort.sort(array);

        assertArrayEquals(
                new int[]{0, 1, 2, 3, 4, 5, 6, 7, 8, 9},
                array
        );
    }

    @Test
    public void arrayVacio() {
        int[] array = {};
        MergeSort.sort(array);
        assertArrayEquals(new int[]{}, array);
    }

    @Test
    public void arrayDeUnSoloElemento() {
        int[] array = {5};
        MergeSort.sort(array);
        assertArrayEquals(new int[]{5}, array);
    }

    @Test
    public void arrayConElementosRepetidos(){
        int[] array = {5, 2, 5, 1, 2};
        MergeSort.sort(array);
        assertArrayEquals(new int[]{1, 2, 2, 5, 5}, array);
    }

    @Test
    public void arrayOrdenado(){
        int[] array = {1, 2, 3, 4, 5};
        MergeSort.sort(array);
        assertArrayEquals(new int[]{1, 2, 3, 4, 5}, array);
    }
}
