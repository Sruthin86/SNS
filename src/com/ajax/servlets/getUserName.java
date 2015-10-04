package com.ajax.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

/**
 * Servlet implementation class getUserName
 */
@WebServlet("/getUserName")
public class getUserName extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getUserName() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		String[] UserNamevalue = (String[]) session.getAttribute("userNameArray");
		int randNum =  (int) session.getAttribute("randNum");
		PrintWriter out = response.getWriter();
        JSONObject jsonObject = new JSONObject();
        
        try {
        	
          
             jsonObject.put("userName", UserNamevalue[0]);
             jsonObject.put("randNum", randNum);
      
             out.println(jsonObject);
        } catch (Throwable t) {
        	jsonObject.put("Message", "not okay");
             out.println(jsonObject);
        }
        response.setContentType("json");
        out.flush();
        out.close();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	
        
       
       
       
	}

}
