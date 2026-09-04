package com.nexabank.backend.structures;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DynamicArrayTest {

    @Test
    void unArrayNuevoDebeEstarVacio() {
        DynamicArray<String> array = new DynamicArray<>();

        assertEquals(0, array.size());
        assertTrue(array.isEmpty());
    }

    @Test
    void redimensionarElArray(){
        DynamicArray<Integer> array = new DynamicArray<>();
        for(int i = 0; i < 15; i++){
            array.add(i);
        }
        assertThrows(IndexOutOfBoundsException.class, () -> {
            array.get(-1);
        });
        assertThrows(IndexOutOfBoundsException.class, () -> {
            array.get(array.size());
        });
        assertEquals(15,array.size());
        assertEquals(0, array.get(0));
    }

    @Test
    void cambiarElementos(){
        DynamicArray<Integer> array = new DynamicArray<>();
        for(int i = 0; i < 15; i++){
            array.add(i);
        }
        array.set(0,15);
        assertEquals(15,array.get(0));
        assertThrows(IndexOutOfBoundsException.class, () -> {
            array.set(-1,15);
        });
        assertThrows(IndexOutOfBoundsException.class, () -> {
            array.set(array.size(),20);
        });
    }

    @Test
    void eliminarElementos(){
        DynamicArray<Integer> array = new DynamicArray<>();
        for(int i = 0; i < 5; i++){
            array.add(i);
        }
        assertEquals(2, array.remove(2));
        assertEquals(0, array.get(0));
        assertEquals(1, array.get(1));
        assertEquals(3, array.get(2));
        assertEquals(4, array.get(3));
        assertThrows(IndexOutOfBoundsException.class, () -> {
            array.remove(-1);
        });
        assertThrows(IndexOutOfBoundsException.class, () -> {
            array.remove(array.size());
        });
    }

    @Test
    void arrayConStrings() {
        DynamicArray<String> array = new DynamicArray<>();

        array.add("Isaac");
        array.add("NexaBank");

        assertEquals("Isaac", array.get(0));
        assertEquals("NexaBank", array.get(1));
    }

    @Test
    void redimensionamientoDelArray(){
        DynamicArray<Integer> array = new DynamicArray<>();
        for(int i = 0; i <= 99; i++){
            array.add(i);
        }
        assertEquals(100, array.size());
        assertEquals(99, array.get(99));
        assertEquals(0, array.get(0));
        assertEquals(50, array.get(50));
    }
}