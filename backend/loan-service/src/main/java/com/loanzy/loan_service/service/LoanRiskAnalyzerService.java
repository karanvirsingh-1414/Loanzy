package com.loanzy.loan_service.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.loanzy.loan_service.entity.Loan;
import java.util.Map;
import java.util.HashMap;

@Service
public class LoanRiskAnalyzerService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate;

    private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=";

    public LoanRiskAnalyzerService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String analyzeLoanRisk(Loan loan) {
        if (geminiApiKey == null || geminiApiKey.contains("YOUR_API_KEY_HERE")) {
            return "Pending";
        }

        try {

            String prompt = String.format(
                    "You are an AI acting as a strict credit risk officer. " +
                            "Evaluate this simple request: A user applied for a %s of Amount: %s INR. " +
                            "If the amount exceeds 50,00,000 INR (50 Lakhs) for a Personal Loan, immediately reject it due to high default risk. "
                            +
                            "If it is a Business Loan over 5,00,00,000 INR (5 Crores), reject it. Otherwise, approve it loosely. "
                            +
                            "Reply ONLY with the exact word 'APPROVE' or 'REJECT'.",
                    loan.getType(), loan.getAmount().toString());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            JSONObject requestBody = buildGeminiRequest(prompt);

            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);

            ResponseEntity<String> response = restTemplate.postForEntity(
                    GEMINI_URL + geminiApiKey,
                    request,
                    String.class);

            if (response.getBody() != null && response.getBody().toUpperCase().contains("REJECT")) {
                return "Rejected by AI";
            }

            return "Pending";

        } catch (Exception e) {
            e.printStackTrace();
            return "Pending";
        }
    }

    private JSONObject buildGeminiRequest(String prompt) {
        JSONObject textPart = new JSONObject();
        textPart.put("text", prompt);

        JSONArray partsArray = new JSONArray();
        partsArray.put(textPart);

        JSONObject contentObj = new JSONObject();
        contentObj.put("parts", partsArray);

        JSONArray contentsArray = new JSONArray();
        contentsArray.put(contentObj);

        JSONObject root = new JSONObject();
        root.put("contents", contentsArray);
        return root;
    }
}
