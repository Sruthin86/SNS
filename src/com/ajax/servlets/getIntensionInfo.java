package com.ajax.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

/**
 * Servlet implementation class getIntensionInfo
 */
@WebServlet("/getIntensionInfo")
public class getIntensionInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getIntensionInfo() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		String[] namevalue = (String[]) session.getAttribute("nameArray");
		String[] imgvalue = (String[]) session.getAttribute("imgArray");
		String[] UserNamevalue = (String[]) session.getAttribute("userNameArray");
		String counter =  request.getParameter("count");
		int countVal = Integer.parseInt(counter);
		PrintWriter out = response.getWriter();
        JSONObject jsonObject = new JSONObject();
        
        try {
        	
             jsonObject.put("name", namevalue[countVal]);
             jsonObject.put("img", imgvalue[countVal]);
             jsonObject.put("userName", UserNamevalue[countVal]);
             jsonObject.put("count", countVal);
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
