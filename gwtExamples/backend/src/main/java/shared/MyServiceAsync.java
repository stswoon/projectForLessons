package shared;

import com.google.gwt.user.client.rpc.AsyncCallback;

import java.util.ArrayList;

public interface MyServiceAsync {
    void getUserTimeline(String screenName, AsyncCallback<ArrayList<FeedData>> callback);
}
