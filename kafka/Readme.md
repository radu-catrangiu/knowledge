# Kafka Knowledge

* Kafka Client (Windows, Mac, Linux): [Conduktor](https://www.conduktor.io/)

* [Running kafka in docker machine](https://medium.com/@marcelo.hossomi/running-kafka-in-docker-machine-64d1501d6f0b)

* [How to install Kafka using Docker](https://itnext.io/how-to-install-kafka-using-docker-a2b7c746cbdc)

# Problem

When connecting a second instance with a different port mapping than 9092 there's this error:

> kafka_kafka-server2_1 | [2020-07-11 20:23:30,796] WARN [Controller id=1011, targetBrokerId=1011] Connection to node 1011 (localhost/127.0.0.1:9093) could not be established. Broker may not be available. (org.apache.kafka.clients.NetworkClient)