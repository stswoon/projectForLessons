package shared;

import java.io.Serializable;

public class FeedData implements Serializable {
    private String data;

    public FeedData() {
    }

    public FeedData(String data) {
        this.data = data;
    }

    public String getData() {
        return data;
    }
}
