 function formatDate(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);
  
    // Get individual date and time components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0'); // Convert to local time
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Construct the desired format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

 function getCurrentFormattedTime() {
  const now = new Date();

  // Get individual components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Combine into the desired format
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}
 function calculateTimeDifferenceInHours(startTime, endTime) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // Get the difference in milliseconds
  const diffInMs = endDate - startDate;

  // Convert milliseconds to hours
  const totalHours = diffInMs / (1000 * 60 * 60);

  // Extract hours and minutes
  const hours = Math.floor(totalHours); // Get whole hours
  const minutes = Math.round((totalHours - hours) * 60); // Get remaining minutes

  return { hours, minutes };
}

 function calculatingTheNoPriority(arr){
  var totalPriorityOne = 0;
  var totalPriorityTwo = 0;
  var totalPriorityThree = 0;
  var totalPriorityFour = 0;
  var totalPriorityFive = 0;
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].priority == 1) {
      totalPriorityOne ++;
    }
    else if (arr[index].priority == 2) {
      totalPriorityTwo ++;
    }
    else if (arr[index].priority == 3) {
      totalPriorityThree ++;
    }
    else if (arr[index].priority == 4) {
      totalPriorityFour ++;
    }
    else if (arr[index].priority == 5) {
      totalPriorityFive ++;
    }
    
  }
  return {totalPriorityOne,totalPriorityTwo, totalPriorityThree, totalPriorityFour, totalPriorityFive};
  
  
}

 function totalTaskCount(arr){

  var totalTask = 0;
  var totalPendingTask = 0;
  var totalFinishedTask = 0;
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].task_status == "pending") {
      totalPendingTask +=1;
    }
    else{
      totalFinishedTask +=1;
    }
    if (arr[index].task_id) {
      totalTask +=1
    }
    
     

    
  }
  return {totalTask , totalPendingTask , totalFinishedTask};

}
module.exports = { formatDate ,getCurrentFormattedTime ,totalTaskCount, calculatingTheNoPriority , calculateTimeDifferenceInHours };