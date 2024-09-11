export interface Order {
  price: number,
  size: number,
}

export interface ServerRespond {
  stock: string,
  top_bid: Order,
  top_ask: Order,
  timestamp: Date,
}

class DataStreamer {
  static API_URL: string = 'http://localhost:8080/query?id=1';

  static getData(callback: (data: ServerRespond[]) => void): void {
    const request = new XMLHttpRequest();
    request.open('GET', DataStreamer.API_URL, true); // Asynchronous request

    request.onload = () => {
      if (request.status === 200) {
        try {
          const responseData: ServerRespond[] = JSON.parse(request.responseText);
          callback(responseData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        console.error('Request failed with status:', request.status);
        alert('Request failed');
      }
    };

    request.onerror = () => {
      console.error('Request failed');
      alert('Request failed');
    };

    request.send();
  }
}

export default DataStreamer;
