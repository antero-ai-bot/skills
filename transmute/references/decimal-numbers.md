# COBOL-to-Java Porting Example: Decimal Numbers

This example focuses on porting COBOL's fixed-point decimal logic to Java using `BigDecimal`.

## Source (COBOL)
```cobol
01  A   PIC 99V99 	VALUE 10.11.
01  B   PIC 99V99 	VALUE 20.22.
01  C   PIC 99V99 	VALUE 00.00.
...
ADD A TO B GIVING C.
```

## Reconstruction Strategy
1. **Model**: Create a Java class with `BigDecimal` fields for A, B, and C.
2. **Logic**: Use `BigDecimal.add()` for functional reconstruction.
3. **Verification**: Assert that `c.toString()` in Java matches the `DISPLAY C` output from COBOL.

## Java Pattern
```java
public class DecimalLogic {
    private BigDecimal a = new BigDecimal("10.11");
    private BigDecimal b = new BigDecimal("20.22");
    private BigDecimal c;

    public void execute() {
        this.c = a.add(b);
    }
}
```
