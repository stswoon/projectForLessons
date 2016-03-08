package shared;

import com.google.gwt.user.client.rpc.RemoteService;
import com.google.gwt.user.client.rpc.RemoteServiceRelativePath;

import java.util.ArrayList;

@RemoteServiceRelativePath("service")
public interface MyService extends RemoteService
{
    ArrayList<FeedData> getUserTimeline(String screenName) throws GMyException;
}
