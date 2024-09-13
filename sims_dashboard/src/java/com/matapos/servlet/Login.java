/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package com.matapos.servlet;

import com.bo.function.JsonProcess;
import com.bo.function.SendHttpProcess;
import com.matapos.parameter.StaticParameter;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author suhan
 */
@WebServlet(name = "Login", urlPatterns = {"/Login"})
public class Login extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Login</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet Login at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//        processRequest(request, response);
        BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
        HashMap req = new HashMap();
        HashMap resp = new HashMap();
        SendHttpProcess http = new SendHttpProcess();

        try {

            
//            String reqMsg = JsonProcess.generateJson(req);
            String reqMsg = 
          "{"
        + "\"originalPartnerReferenceNo\": \"2020102900000000000026\","
        + "\"originalReferenceNo\": \"220928000007\","
        + "\"merchantId\": \"220901002000000\","
        + "\"originalExternalId\": \"1664357352\","
        + "\"externalStoreId\": \"12345\","
        + "\"latestTransactionStatus\": \"00\","
        + "\"transactionStatusDesc\": \"Success\","
        + "\"createdTime\": \"2022-09-28T16:28:36+07:00\","
        + "\"finishedTime\": \"2022-09-28T16:28:45+07:00\","
        + "\"amount\": {"
        + "  \"value\": \"10000.00\","
        + "  \"currency\": \"IDR\""
        + "},"
        + "\"additionalInfo\": {"
        + "  \"transactionDate\": \"2022-09-28T16:28:44+07:00\","
        + "  \"customerData\": \"John Doe\","
        + "  \"customerPan\": \"936008180000000308\","
        + "  \"merchantPan\": \"936008180220901002\","
        + "  \"acquirerId\": \"93600818\","
        + "  \"issuerName\": \"Paydia\","
        + "  \"rrn\": \"220928000004\","
        + "  \"mdr\": {"
        + "    \"value\": \"70.00\","
        + "    \"currency\": \"IDR\""
        + "  },"
        + "  \"layanan\": {"
        + "    \"value\": \"0.00\","
        + "    \"currency\": \"IDR\""
        + "  },"
        + "  \"nominalPaid\": {"
        + "    \"value\": \"100000.00\","
        + "    \"currency\": \"IDR\""
        + "  },"
        + "  \"totalPaid\": {"
        + "    \"value\": \"10000.00\","
        + "    \"currency\": \"IDR\""
        + "  },"
        + "  \"totalReceive\": {"
        + "    \"value\": \"9930.00\","
        + "    \"currency\": \"IDR\""
        + "  },"
        + "  \"terminalId\": \"00001504QR75A000134\""
        + "}"
        + "}";
            System.out.println("ini dia : "+ reqMsg);
            req.put("user_id", "user_id");
            req.put("password", "password");
            String responseWeb = http.sendHttpRequest(StaticParameter.urlBOServer, reqMsg);
            resp = JsonProcess.decodeJson(responseWeb);
            System.out.println("ini response : "+resp);

            response.setContentType("application/json");
            response.getWriter().print(resp);
        } catch (IOException e) {
            System.out.println("error : " + e);
            response.setContentType("application/json");
            response.getWriter().print("error");
        } finally {
            req = null;
            resp = null;
//            mp = null;
            http = null;
            br = null;
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}


//package com.matapos.servlet;
//
//import com.google.gson.Gson;
//import java.io.IOException;
//import javax.servlet.ServletException;
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
///**
// * Servlet implementation class Login
// */
//@WebServlet(name = "Login", urlPatterns = {"/Login"})
//public class Login extends HttpServlet {
//
//    private static final Gson gson = new Gson();
//    
//    // Hardcoded JSON data
//    private static final String HARD_CODED_JSON = "{"
//        + "\"originalPartnerReferenceNo\": \"2020102900000000000026\","
//        + "\"originalReferenceNo\": \"220928000007\","
//        + "\"merchantId\": \"220901002000000\","
//        + "\"originalExternalId\": \"1664357352\","
//        + "\"externalStoreId\": \"12345\","
//        + "\"latestTransactionStatus\": \"00\","
//        + "\"transactionStatusDesc\": \"Success\","
//        + "\"createdTime\": \"2022-09-28T16:28:36+07:00\","
//        + "\"finishedTime\": \"2022-09-28T16:28:45+07:00\","
//        + "\"amount\": {"
//        + "  \"value\": \"10000.00\","
//        + "  \"currency\": \"IDR\""
//        + "},"
//        + "\"additionalInfo\": {"
//        + "  \"transactionDate\": \"2022-09-28T16:28:44+07:00\","
//        + "  \"customerData\": \"John Doe\","
//        + "  \"customerPan\": \"936008180000000308\","
//        + "  \"merchantPan\": \"936008180220901002\","
//        + "  \"acquirerId\": \"93600818\","
//        + "  \"issuerName\": \"Paydia\","
//        + "  \"rrn\": \"220928000004\","
//        + "  \"mdr\": {"
//        + "    \"value\": \"70.00\","
//        + "    \"currency\": \"IDR\""
//        + "  },"
//        + "  \"layanan\": {"
//        + "    \"value\": \"0.00\","
//        + "    \"currency\": \"IDR\""
//        + "  },"
//        + "  \"nominalPaid\": {"
//        + "    \"value\": \"100000.00\","
//        + "    \"currency\": \"IDR\""
//        + "  },"
//        + "  \"totalPaid\": {"
//        + "    \"value\": \"10000.00\","
//        + "    \"currency\": \"IDR\""
//        + "  },"
//        + "  \"totalReceive\": {"
//        + "    \"value\": \"9930.00\","
//        + "    \"currency\": \"IDR\""
//        + "  },"
//        + "  \"terminalId\": \"00001504QR75A000134\""
//        + "}"
//        + "}";
//
//    @Override
//    protected void doPost(HttpServletRequest request, HttpServletResponse response)
//            throws ServletException, IOException {
//        response.setContentType("application/json");
//        response.setCharacterEncoding("UTF-8");
//        response.getWriter().write(HARD_CODED_JSON);
//    }
//
//    @Override
//    public String getServletInfo() {
//        return "Servlet that returns hardcoded JSON data";
//    }
//}
