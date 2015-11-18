function testException() {
    try {
        return "ok";
    } finally {
        alert("finally");
    }
}

testException();