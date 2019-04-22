import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.apache.kafka.common.utils.CollectionUtils;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.rnorth.ducttape.unreliables.Unreliables;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.KafkaContainer;
import org.testcontainers.shaded.com.google.common.collect.ImmutableMap;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.junit.Assert.assertEquals;


//https://github.com/testcontainers/testcontainers-java
//https://www.testcontainers.org/quickstart/junit_4_quickstart/
//https://www.testcontainers.org/modules/kafka/
//https://javalibs.com/artifact/org.testcontainers/kafka
//https://www.slf4j.org/codes.html#no_static_mdc_binder
//https://www.slf4j.org/codes.html#StaticLoggerBinder
//https://stackoverflow.com/questions/11916706/slf4j-failed-to-load-class-org-slf4j-impl-staticloggerbinder-error
//https://stackoverflow.com/questions/25487116/log4j2-configuration-no-log4j2-configuration-file-found

public class KafkaTest {
    @Test
    public void testSimplePutAndGet() throws ExecutionException, InterruptedException {
        KafkaContainer kafka = new KafkaContainer();
        kafka.start();
        String bootstrapServers = kafka.getBootstrapServers();


        KafkaProducer<String, String> producer = new KafkaProducer<>(
                ImmutableMap.of(
                        ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers,
                        ProducerConfig.CLIENT_ID_CONFIG, UUID.randomUUID().toString()
                ),
                new StringSerializer(),
                new StringSerializer()
        );

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(
                ImmutableMap.of(
                        ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers,
                        ConsumerConfig.GROUP_ID_CONFIG, "tc-" + UUID.randomUUID(),
                        ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest"
                ),
                new StringDeserializer(),
                new StringDeserializer()
        );

        String topicName = "messages";
        consumer.subscribe(Arrays.asList(topicName));
        producer.send(new ProducerRecord<>(topicName, "testcontainers", "rulezzz")).get();
        Unreliables.retryUntilTrue(10, TimeUnit.SECONDS, () -> {
            ConsumerRecords<String, String> records = consumer.poll(100);
            if (records.isEmpty()) {
                return false;
            }

            ConsumerRecord<String, String> record = records.iterator().next();
            assertEquals(record.value(), "rulezzz");
            return true;
        });
        consumer.unsubscribe();
    }
}
