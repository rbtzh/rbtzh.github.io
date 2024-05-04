---
title: "OSPF by 7 Examples, GNS3 and Cisco"
date: 2024-05-04T22:51:33+08:00
# weight: 1
# aliases: ["/first"]
tags: ["GNS3","Cisco","Networking","OSPF","Route Summarization","redistribute","stub","NSSA","Totelly Stubby","Static Routing","Routing","Switching", "EtherSwitch"]
author: "Zhao Yanbo"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
description: "Step by step tutorial on how to configure OSPF of Cisco devices in GNS3."
canonicalURL: "https://blog.zhaoyanbo.com/posts/ospf/"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
cover:
    image: "/images/ospf/cover.png" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: false # only hide on current single page
editPost:
    URL: "github.com/rbtzh/rbtzh.github.io/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: false # to append file path to Edit link
---

## Simple Model

![Topology of Simple Model](/images/ospf/simple-model.png "alt")

### Step by Step

#### R1

```cisco
enable
conf ter
interface f 0/0
ip addr 10.10.10.1 255.255.255.0
no shutdown
exit

router ospf 1
network 10.10.10.0 0.0.0.255 area 0
exit

end
```

#### R2

```cisco
enable
conf ter
interface f 0/0
ip addr 10.10.10.2 255.255.255.0
no shutdown
exit

router ospf 1
network 10.10.10.0 0.0.0.255 area 0
exit

end
```

🎉

## Single Area Model

### Topology

![Topology of Single Area Model](/images/ospf/single-area-model.png "alt")

### Step by Step

#### PC1

```
ip 10.10.10.10/24 10.10.10.1
```

#### PC2

```
ip 50.50.50.50/24 50.50.50.1

```

#### R1

```cisco
enable
conf ter

interface f 0/0
ip addr 10.10.10.1 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 20.20.20.1 255.255.255.0
no shutdown
exit

router ospf 1
network 10.10.10.0 0.0.0.255 area 0
network 20.20.20.0 0.0.0.255 area 0
exit

end

```

#### R2

```cisco
enable
conf ter

interface f 0/0
ip addr 20.20.20.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 30.30.30.1 255.255.255.0
no shutdown
exit

router ospf 1
network 20.20.20.0 0.0.0.255 area 0
network 30.30.30.0 0.0.0.255 area 0
exit

end

```

#### R3

```cisco
enable
conf ter

interface f 0/0
ip addr 30.30.30.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 40.40.40.1 255.255.255.0
no shutdown
exit

router ospf 1
network 30.30.30.0 0.0.0.255 area 0
network 40.40.40.0 0.0.0.255 area 0
exit

end

```

#### R4

```cisco
enable
conf ter

interface f 0/0
ip addr 40.40.40.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 50.50.50.1 255.255.255.0
no shutdown
exit

router ospf 1
network 40.40.40.0 0.0.0.255 area 0
network 50.50.50.0 0.0.0.255 area 0
exit

end

```

🎉

### Test

#### On Any Router

```
show ip route
show ip ospf neighbor
```

### Note

In this configuration, we didn't configure route ID or loopback address. This is not recommended since the change of interface status might cause unstable of DR and BDR. In the next model, we will configure the router-id and loopback address for every router..

## Multiple Area Model

### Topology

![Topology of Multiple Area Model](/images/ospf/multiple-area-model.png "alt")

### Step by Step

#### PC1

```
ip 10.10.10.10/24 10.10.10.1
```

#### PC2

```
ip 50.50.50.50/24 50.50.50.1

```

#### R1

```cisco
enable
conf ter

interface f 0/0
ip addr 10.10.10.1 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 20.20.20.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 1.1.1.1 255.255.255.255
no shutdown
exit

router ospf 1
router-id 1.1.1.1
network 10.10.10.0 0.0.0.255 area 1
network 20.20.20.0 0.0.0.255 area 1
exit

end
```

#### R2

```cisco
enable
conf ter

interface f 0/0
ip addr 20.20.20.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 30.30.30.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 2.2.2.2 255.255.255.255
no shutdown
exit

router ospf 1
router-id 2.2.2.2
network 20.20.20.0 0.0.0.255 area 1
network 30.30.30.0 0.0.0.255 area 0
exit

end
```

#### R3

```cisco
enable
conf ter

interface f 0/0
ip addr 30.30.30.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 40.40.40.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 3.3.3.3 255.255.255.255
no shutdown
exit

router ospf 1
router-id 3.3.3.3
network 30.30.30.0 0.0.0.255 area 0
network 40.40.40.0 0.0.0.255 area 2
exit

end
```

#### R4

```cisco
enable
conf ter

interface f 0/0
ip addr 40.40.40.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 50.50.50.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 4.4.4.4 255.255.255.255
no shutdown
exit

router ospf 1
router-id 4.4.4.4
network 40.40.40.0 0.0.0.255 area 2
network 50.50.50.0 0.0.0.255 area 2
exit

end

```

🎉

### Test

#### On Any Router

```
show ip route
show ip ospf neighbor
```

## Redistribute

### Topology

![Topology of Redistribute](/images/ospf/redistribute.png "alt")


### Step by Step

#### R1

```cisco
enable
conf ter

interface f 0/0
ip addr 10.1.3.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 10.1.1.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 110.1.1.1 255.255.255.255
no shutdown
exit

ip routing
ip route 10.1.3.0 255.255.255.0 FastEthernet0/0
ip route 10.1.1.0 255.255.255.0 FastEthernet0/1
ip route 10.1.2.0 255.255.255.0 FastEthernet0/1
ip route 10.1.4.0 255.255.255.0 FastEthernet0/1

end
```

#### R2

```cisco
enable
conf ter

interface f 0/0
ip addr 10.1.1.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 10.1.2.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 120.1.1.1 255.255.255.255
no shutdown
exit

router ospf 1
router-id 120.1.1.1
network 10.1.2.0 0.0.0.255 area 0
network 10.1.4.0 0.0.0.255 area 0
redistribute static subnets
redistribute connected subnets
exit

ip routing
ip route 10.1.1.0 255.255.255.0 FastEthernet0/0
ip route 10.1.3.0 255.255.255.0 FastEthernet0/0

end
```

#### R3

```cisco

enable
conf ter

interface f 0/0
ip addr 10.1.2.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 10.1.4.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 130.1.1.1 255.255.255.255
no shutdown
exit

router ospf 1
router-id 130.1.1.1
network 10.1.2.0 0.0.0.255 area 0
network 10.1.4.0 0.0.0.255 area 0
exit

end

```

#### PC1

```cisco
ip 10.1.3.1/24 10.1.3.2
```

#### PC2

```cisco
ip 10.1.4.2/24 10.1.4.1
```

🎉

## Stub, Totally-Stubby and NSSA

### Topology

![Topology of Stub, Totally-Stubby and NSSA](/images/ospf/stub-totelly-stubby-nssa.png "alt")


### Step by Step

#### Area 1 as Stub Area

First, we will config area1 as stub area

##### R1

```cisco
enable
conf ter
interface f 0/0
ip addr 10.1.4.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 10.1.1.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 1.1.1.1 255.255.255.255
no shutdown
exit

router ospf 1
router-id 1.1.1.1
area 1 stub
network 10.1.1.0 0.0.0.255 area 1
network 10.1.4.0 0.0.0.255 area 1
exit

end
```

##### R2

```cisco
enable
conf ter
interface f 0/0
ip addr 10.1.1.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 10.1.2.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 2.2.2.2 255.255.255.255
no shutdown
exit

router ospf 1
router-id 2.2.2.2
area 1 stub
network 10.1.1.0 0.0.0.255 area 1
network 10.1.2.0 0.0.0.255 area 0
exit

end
```

##### R3

```cisco
enable
conf ter
interface f 0/0
ip addr 10.1.2.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 10.1.3.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 3.3.3.3 255.255.255.255
no shutdown
exit

router ospf 1
router-id 3.3.3.3
network 10.1.2.0 0.0.0.255 area 0
network 10.1.3.0 0.0.0.255 area 0
```

### Test

#### On Any Router

```
show ip route
show ip ospf neighbor
show ip ospf database
```

exit

end

```

##### PC1

```cisco
ip 10.1.4.1/24 10.1.4.2
```

##### PC2

```cisco
ip 10.1.3.2/24 10.1.3.1
```

Now you should check Route and LSDB.

```cisco
show ip route
show ip ospf database
```

#### Area 1 as totally-stubby area

Then we will config area1 as totally-stubby area

##### R1

```cisco
enable
conf ter

router ospf 1
area 1 stub no-summary
exit

end
```

##### R2

```cisco
enable
conf ter

router ospf 1
area 1 stub no-summary
exit

end
```

Now you should check Route and LSDB on all routers.

```cisco
show ip route
show ip ospf database
```

#### Area 1 as NSSA

Then we will config area1 as NSSA

##### R1

```cisco
enable
conf ter

router ospf 1
no area 1 stub
area 1 nssa
exit

end
```

##### R2

```cisco
enable
conf ter

router ospf 1
no area 1 stub
area 1 nssa
exit

end
```

Now you should check Route and LSDB on all routers.

```cisco
show ip route
show ip ospf database
```

🎉

## Route Summarization

### Topology

![Topology of Route Summarization](/images/ospf/route-summarization.png "alt")

### Step by Step

#### R1

```cisco
enable
conf ter

interface f 0/0
ip address 10.1.3.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip address 10.1.4.2 255.255.255.0
no shutdown
exit

interface f 1/0
ip address 10.1.2.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip address 1.1.1.1 255.255.255.255
no shutdown 
exit

router ospf 1
router-id 1.1.1.1
network 10.1.2.0 0.0.0.255 area 1
network 10.1.3.0 0.0.0.255 area 1
network 10.1.4.0 0.0.0.255 area 1
exit

end

```

#### R2

```cisco
enable
conf ter

interface f 0/0
ip address 10.1.2.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip address 10.1.1.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip address 2.2.2.2 255.255.255.255
no shutdown 
exit

router ospf 1
router-id 2.2.2.2
network 10.1.1.0 0.0.0.255 area 0
network 10.1.2.0 0.0.0.255 area 1
exit

end

```

#### R3

```cisco
enable
conf ter

interface f 0/0
ip address 10.1.1.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip address 192.168.1.1 255.255.255.0
no shutdown
exit

interface f 1/0
ip address 192.168.2.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip address 3.3.3.3 255.255.255.255
no shutdown 
exit

router ospf 1
router-id 3.3.3.3
network 10.1.1.0 0.0.0.255 area 0
redistribute connected subnets
exit

ip routing
ip route 192.168.1.0 255.255.255.0 FastEthernet0/1
ip route 192.168.2.0 255.255.255.0 FastEthernet1/0

end

```

#### PC1

```cisco
ip 192.168.1.2/24 192.168.1.1
```

#### PC2

```cisco
ip 192.168.2.2/24 192.168.2.1
```

#### PC3

```cisco
ip 10.1.3.1/24 10.1.3.2
```

#### PC4

```cisco
ip 10.1.4.1/24 10.1.4.2
```

Now check LSDB and routing table using

```cisco
show ip route
show ip ospf database
show ip ospf neighbor
```

we are adding route summarization to this network.

#### R2

note: This is a ABR, so use ```area [area-id] prefix mask``` to summarize route

```cisco
conf ter
router ospf 1
area 1 range 10.1.0.0 255.255.248.0 
end
```

### R3

```cisco
conf ter
router ospf 1
summary-address 192.168.0.0 255.255.252.0
endimage
```

Now check LSDB and routing table using

```cisco
show ip route
show ip ospf database
show ip ospf neighbor
```

## Mixed Types of Area

### Topology

![Topology of Mixed Types of Area](/images/ospf/mixed-types-of-area.png "alt")

### Step by Step

#### R1

```cisco
enable
conf ter
interface f 0/0
ip addr 30.30.30.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 40.40.40.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 1.1.1.1 255.255.255.255
no shutdown
exit

router ospf 1
router-id 1.1.1.1
network 40.40.40.0 0.0.0.255 area 0
network 30.30.30.0 0.0.0.255 area 0
exit

end
```

#### R2

```cisco
enable
conf ter
interface f 0/1
ip addr 50.50.50.2 255.255.255.0
no shutdown
exit

interface f 0/0
ip addr 60.60.60.1 255.255.255.0
no shutdown
exit

interface f 1/0
ip addr 90.90.90.2 255.255.255.0
no shutdown
exit
interface f 2/0
ip addr 100.100.100.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 2.2.2.2 255.255.255.255
no shutdown
exit

router ospf 1
router-id 2.2.2.2
network 50.50.50.0 0.0.0.255 area 0
network 60.60.60.0 0.0.0.255 area 0
network 90.90.90.0 0.0.0.255 area 3
network 100.100.100.0 0.0.0.255 area 3
area 3 virtual-link 9.9.9.9
exit

end
```

#### R3

```cisco
enable
conf ter
interface f 1/0
ip addr 50.50.50.1 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 30.30.30.1 255.255.255.0
no shutdown
exit

interface f 0/0
ip addr 20.20.20.2 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 3.3.3.3 255.255.255.255
no shutdown
exit

router ospf 1
router-id 3.3.3.3
area 1 stub
network 50.50.50.0 0.0.0.255 area 0
network 30.30.30.0 0.0.0.255 area 0
network 20.20.20.0 0.0.0.255 area 1
exit

end
```

#### R4

```cisco
enable
conf ter
interface f 0/0
ip addr 40.40.40.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 60.60.60.2 255.255.255.0
no shutdown
exit

interface f 1/0
ip addr 70.70.70.1 255.255.255.0
no shutdown
exit

interface f 2/0
ip addr 80.80.80.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 4.4.4.4 255.255.255.255
no shutdown
exit

router ospf 1
router-id 4.4.4.4
network 40.40.40.0 0.0.0.255 area 0
network 60.60.60.0 0.0.0.255 area 0
network 70.70.70.0 0.0.0.255 area 2
network 80.80.80.0 0.0.0.255 area 2
area 2 stub no-summary
exit

end
```

#### R5

```cisco
enable
conf ter
interface f 1/0
ip addr 20.20.20.1 255.255.255.0
no shutdown
exit

interface f 0/0
ip addr 10.10.10.2 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 5.5.5.5 255.255.255.255
no shutdown
exit

router ospf 1
router-id 5.5.5.5
area 1 stub
network 10.10.10.0 0.0.0.255 area 1
network 20.20.20.0 0.0.0.255 area 1
exit

end
```

#### R6

```cisco
enable
conf ter

interface f 0/0
ip addr 10.10.10.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 6.6.6.6 255.255.255.255
no shutdown
exit

router ospf 1
router-id 6.6.6.6
area 1 stub
network 10.10.10.0 0.0.0.255 area 1
exit

end
```

#### R7

```cisco
enable
conf ter

interface f 0/0
ip addr 80.80.80.2 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 7.7.7.7 255.255.255.255
no shutdown
exit

router ospf 1
router-id 6.6.6.6
network 80.80.80.0 0.0.0.255 area 2
area 2 stub no-summary
exit

end
```

#### R8

```cisco
enable
conf ter
interface f 0/1
ip addr 70.70.70.2 255.255.255.0
no shutdown
exit


interface loopback 0
ip addr 8.8.8.8 255.255.255.255
no shutdown
exit

router ospf 1
router-id 8.8.8.8
network 70.70.70.0 0.0.0.255 area 2
area 2 stub no-summary
exit

end
```

#### R9

```cisco
enable
conf ter
interface f 0/0
ip addr 90.90.90.1 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 110.110.110.2 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 9.9.9.9 255.255.255.255
no shutdown
exit

router ospf 1
router-id 9.9.9.9
network 90.90.90.0 0.0.0.255 area 3
network 110.110.110.0 0.0.0.255 area 4
area 3 virtual-link 2.2.2.2
area 4 nssa
exit

end
```

#### R10

```cisco
enable
conf ter
interface f 0/0
ip addr 100.100.100.2 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 140.140.140.1 255.255.255.0
no shutdown
exit


interface loopback 0
ip addr 10.10.10.10 255.255.255.255
no shutdown
exit

router ospf 1
redistribute rip subnets
router-id 10.10.10.10
network 100.100.100.0 0.0.0.255 area 3
exit

router rip
version 2
redistribute ospf 1 metric 1
network 140.140.140.0
exit

end
```

#### R11

```cisco
enable
conf ter
interface f 0/0
ip addr 120.120.120.1 255.255.255.0
no shutdown
exit

interface f 0/1
ip addr 130.130.130.2 255.255.255.0
no shutdown
exit


interface loopback 0
ip addr 11.11.11.11 255.255.255.255
no shutdown
exit

router ospf 1
redistribute rip subnets
router-id 11.11.11.11
network 120.120.120.0 0.0.0.255 area 4
area 4 nssa
exit

router rip
version 2
redistribute ospf 1 metric 1
network 130.130.130.0
exit

end
```

#### R12

```cisco
enable
conf ter
interface f 0/1
ip addr 110.110.110.1 255.255.255.0
no shutdown
exit

interface f 0/0
ip addr 120.120.120.2 255.255.255.0
no shutdown
exit


interface loopback 0
ip addr 12.12.12.12 255.255.255.255
no shutdown
exit

router ospf 1
router-id 12.12.12.12
network 110.110.110.0 0.0.0.255 area 4
network 120.120.120.0 0.0.0.255 area 4
area 4 nssa
exit

end
```

#### R13

```cisco
enable
conf ter
interface f 0/0
ip addr 130.130.130.1 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 13.13.13.13 255.255.255.255
no shutdown
exit

router rip
version 2
network 130.130.130.0
exit

end
```

#### R14

```cisco
enable
conf ter
interface f 0/0
ip addr 140.140.140.2 255.255.255.0
no shutdown
exit

interface loopback 0
ip addr 14.14.14.14 255.255.255.255
no shutdown
exit

router rip
version 2
network 140.140.140.0
exit

end
```

🎉

## Reference
<https://www.geeksforgeeks.org/configuring-ospf-route-summarization-in-cisco/>
<http://www.cisco.com/en/US/docs/ios-xml/ios/iproute_ospf/command/ospf-s1.html#wp4241563273>
