1.Kubernetes:
 * Managed Kubernetes service (Kubernetes as a Service)
 * Easy deployment and scaling of containerized applications
2.Block Storage:
  * Highly available and scalable storage volumes
  * Attachable to Droplets for persistent storage
3.Object Storage:
  * S3-compatible storage solution
  * Store and retrieve any amount of data from anywhere
4.Load Balancers: 
  * Distribute incoming traffic across multiple Droplets
  * Improve application performance and availability
5.Networking:
  * Private networking between Droplets
  * Load balancer integration for seamless traffic management
6.Firewall:
  * Cloud firewall to secure Droplets
  * Fine-grained control over inbound and outbound traffic
  * Virtual Private Cloud (VPC):
  * Isolated network environment
  * Enhanced security and control over network resources

5.digital ocean provide minimum and usefull services 

6.Simplicity:
 * User-friendly interface and streamlined workflows
 * Easy and intuitive resource management
Developer Focus:
Tailored for developers and startups
Developer-friendly tools and features
Cost-Effective:
Transparent and affordable pricing structure
No hidden fees or complicated billing
Scalability:
Flexible scaling options
Vertical and horizontal scaling of resources

############################# To create ssh creadential #######################################
step1) adduser :- cmnd for add new user
step2) usermod -aG sudo ranjeet :- give permission to user
step3) nano /etc/ssh/sshd_config :- PasswordAthentication yes	(Replace no to yes)
step4) ufw app list > ufw status > ufw allow OpenSSH > ufw enable :- command for active firewall
step5) systemctl status nginx :- command for check nginx is install or not in server

############################## Droplets ###############################
create droplets
install nginix , nodejs and neccasery commands 
add users
give permission to subusers
network protection through configure firewall 
how to run 2 project with diffrent port with same ip in server :-
    1. got to /etc/nginx/nginx.conf 
    2. server {
        listen 8000;
        server_name example.com;

        root /path/to/project1;
        index index.html;
    }

      server {
       listen 9000;
       server_name example.com;

       root /path/to/project2;
       index index.html;
    }

########################## spaces ##################################
generate access key and secrate key 
create spaces 
write down the code of uploading image through nodejs to droplets 
generate signurl for private images
generate endpoints