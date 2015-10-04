package com.ajax.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * Servlet implementation class UpdateInfo
 */
@WebServlet("/UpdateInfo")
public class UpdateInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public UpdateInfo() {
    	super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		   response.setContentType("application/json, charset=UTF-8");
	       PrintWriter out = response.getWriter();
	       String json = request.getParameter("test");
	       String[] namevalue = new String[20];
	       String[] imgvalue = new String[20];
	       String[] userName = new String[20];
	       Object object=null;
	       JSONArray arrayObj=null;
	       JSONParser jsonParser=new JSONParser();
	       try {
			object=jsonParser.parse(json);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	       arrayObj=(JSONArray) object;
	       System.out.println("Json object :: "+arrayObj.get(1));
	       for (int i =0 ; i < arrayObj.size(); i++ ){
	    	   JSONObject jsObj = (JSONObject) arrayObj.get(i);
	    	   imgvalue[i]  = (String) jsObj.get("image");
	    	   namevalue[i] = (String) jsObj.get("name");
	    	   userName[i] = (String) jsObj.get("userName");
	       }
	        HttpSession session = request.getSession();
	        session.setAttribute("nameArray", namevalue);
	        session.setAttribute("imgArray", imgvalue);
	        session.setAttribute("userNameArray", userName);
	        System.out.println("test");
	        JSONObject jsonObject = new JSONObject();
	        try {
	        	
	             jsonObject.put("Message", "okay");
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
