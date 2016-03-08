package server;

import com.google.gwt.user.server.rpc.RemoteServiceServlet;
import shared.FeedData;
import shared.GMyException;
import shared.MyService;

import java.util.ArrayList;

public class MyServiceImpl extends RemoteServiceServlet implements MyService {
    @Override
    public ArrayList<FeedData> getUserTimeline(String screenName) throws GMyException {
        if ("error".equals(screenName)) {
            throw new GMyException("throw exception for 'error' name");
        }
        ArrayList<FeedData> result = new ArrayList<FeedData>();
        result.add(new FeedData("hello"));
        return result;
    }
}
