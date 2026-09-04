package com.nexabank.backend.structures;

public class DynamicArray<T> {

    private Object[] elements;
    private int size;

    private static final int  INITIAL_CAPACITY = 10;

    public DynamicArray() {
        elements = new Object[INITIAL_CAPACITY];
        size = 0;
    }

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public void add(T element) {
        if (size < elements.length) {
            elements[size++] = element;
        } else {
            int newCapacity = elements.length * 2;
            Object[] new_elements = new Object[newCapacity];
            for (int i = 0; i < elements.length; i++) {
                new_elements[i] = elements[i];
            }
            new_elements[size++] = element;
            elements = new_elements;
        }
    }

    public T get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index fuera de rango");
        }
        return (T) elements[index];
    }

    public void set(int index, T element) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index fuera de rango");
        }
        elements[index] = element;

    }

    public T remove(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException("Index fuera de rango");
        }
        T removedElement = (T) elements[index];
        for (int i = index; i < size - 1; i++) {
            elements[i] = elements[i + 1];
        }
        elements[size - 1] = null;
        size--;
        return removedElement;
    }

}