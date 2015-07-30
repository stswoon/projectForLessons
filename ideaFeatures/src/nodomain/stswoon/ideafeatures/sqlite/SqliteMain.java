package nodomain.stswoon.ideafeatures.sqlite;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class SqliteMain {
    private static final String DB_FILE = "W:\\IdeaProjects\\projectForLessons\\ideaFeatures\\resources\\sqlite\\test-sqllite";

    public static void main(String[] args) {
        Connection connection = null;
        ResultSet resultSet = null;
        Statement statement = null;

        try {
            Class.forName("org.sqlite.JDBC");
            connection = DriverManager.getConnection("jdbc:sqlite:" + DB_FILE);
            statement = connection.createStatement();
            resultSet = statement.executeQuery("SELECT * FROM testTable");
            while (resultSet.next()) {
                System.out.println(resultSet.getString("text"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                resultSet.close();
                statement.close();
                connection.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}

