package com.SLAGuard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SlaGuardApplication {

	public static void main(String[] args) {
		SpringApplication.run(SlaGuardApplication.class, args);
	}

}
