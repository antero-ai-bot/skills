# Reference Pair: COBOL to Java

## Context
Modernizing mainframe logic to Java Spring Boot.

## Prompt Strategy
1. **Rule Extraction**: Focus on the `PROCEDURE DIVISION`. Ask the agent to list every conditional rule and math operation.
2. **Data Mapping**: Map the `DATA DIVISION` (working-storage) to Java POJOs or DTOs.
3. **Loop Translation**: Convert `PERFORM` loops to Java `while` or `for` streams.

## Verification Pattern
- **Legacy Call**: Use a wrapper that executes the COBOL binary (or GnuCOBOL) and captures stdout/files.
- **Modern Call**: Execute the Java method.
- **Comparison**: Use a JSON diff to verify that the state change in Working-Storage matches the state change in the Java object.

## Common Pitfalls
- **Decimal Precision**: COBOL's fixed-point math (`PACKED-DECIMAL`) must be handled with `BigDecimal` in Java.
- **Indexing**: COBOL is 1-indexed; Java is 0-indexed.
