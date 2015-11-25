function testException() {
    try {
        return "ok1";
    } finally {
        alert("finally");
    }
}

testException();