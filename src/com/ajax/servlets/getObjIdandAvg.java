package com.ajax.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * Servlet implementation class getObjIdandAvg
 */
@WebServlet("/getObjIdandAvg")
public class getObjIdandAvg extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getObjIdandAvg() {
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
		String objvalue = (String) session.getAttribute("retriveObjId");
		int randNum =  (int) session.getAttribute("randNum");
		int index =  (int) session.getAttribute("index");
		PrintWriter out = response.getWriter();
        JSONObject jsonObject = new JSONObject();
        
        try {
        	
             jsonObject.put("name", namevalue[index]);
             jsonObject.put("img", imgvalue[index]);
             jsonObject.put("userName", UserNamevalue[index]);
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
		 response.setContentType("application/json, charset=UTF-8");
	       PrintWriter out = response.getWriter();
	       String json = request.getParameter("ObjAvgArray");
	       String[] objvalue = new String[6];
	       String[] avgvalue = new String[6];
	       Double[] sortedAvgArray = new Double[6];
	       Double[] sortedAvgCompArray = new Double[6];
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
	       
	       for (int i =0 ; i < arrayObj.size(); i++ ){
	    	   JSONObject jsObj = (JSONObject) arrayObj.get(i);
	    	   objvalue[i]  = (String) jsObj.get("objId");
	    	   avgvalue[i] = (String) jsObj.get("avg");
	    	   String s = avgvalue[i].trim();
//	    	   double d =  Double.parseDouble(s);
	    	   sortedAvgArray[i] =  Double.valueOf(s);
	    	   sortedAvgCompArray[i] =  Double.valueOf(s);
	       }
	       //sortedAvgArray = avgvalue
	       int index = 0;
	        Arrays.sort(sortedAvgCompArray);
	        
	       
	        int min = 1;
	        int max = 4;
	        Random random = new Random();
	        int  randomNum = random.nextInt(max - min + 1) + min;
	        if (randomNum == 1 || randomNum == 3 ){
	        	for (int i = 0; i < sortedAvgArray.length; i++) {
	        		double  current = sortedAvgArray[i];
	        		double  reference = sortedAvgCompArray[0];
		            if(current == reference){
		            	index = i;
		                
		            }
		        }
	        }
	        else if (randomNum == 2 || randomNum == 4 ){
	        	for (int i = 0; i < avgvalue.length; i++) {
	        		double  current = sortedAvgArray[i];
	        		double  reference = sortedAvgCompArray[sortedAvgCompArray.length - 1];
		            if(current == reference){
		            	index = i;
		                
		            }
		        }
	        }
	        HttpSession session = request.getSession();
	        session.setAttribute("objArray", objvalue);
	        session.setAttribute("avgArray", sortedAvgArray);
	        session.setAttribute("randNum", randomNum);
	        session.setAttribute("index", index);
	        session.setAttribute("retriveObjId", objvalue[index]);
	        
	        //System.out.println("test");
	        JSONObject jsonObject = new JSONObject();
	        try {
	             jsonObject.put("Message", " getObjIdandAvg okay");
	             out.println(jsonObject);
	        } catch (Throwable t) {
	        	jsonObject.put("Message", "not okay");
	             out.println(jsonObject);
	        }
	        response.setContentType("json");
	        out.flush();
            out.close();
	}

}
