(ns slipstream.ui.data.image-new
  (:require [net.cgrand.enlive-html :as html]))
  
(def xml-image (first (html/html-snippet "<imageModule category='Image' creation='2013-03-07 21:03:09.124 CET' deleted='false' imageId='HZTKYZgX7XzSokCHMB60lS0wsiv' isBase='true' lastModified='2013-03-07 21:03:09.337 CET' loginUser='donald' name='Public/BaseImages/Ubuntu/new' parentUri='module/Public/BaseImages/Ubuntu' platform='debian' resourceUri='module/Public/BaseImages/Ubuntu/new' shortName='new' version='4' description='Nice Ubuntu distro'>
<parameters class='org.hibernate.collection.PersistentMap'>
<entry>
<string>extra.disk.volatile</string>
<parameter category='Cloud' class='com.sixsq.slipstream.persistence.ModuleParameter' description='Volatile extra disk in GB' isSet='false' mandatory='true' name='extra.disk.volatile' readonly='false' type='String'>
   <value>12345</value>
</parameter>
</entry>
<entry>
<string>stratuslab.disks.bus.type</string>
<parameter category='stratuslab' class='com.sixsq.slipstream.persistence.ModuleParameter' description='VM disks bus type' isSet='true' mandatory='true' name='stratuslab.disks.bus.type' readonly='false' type='Enum'>
<enumValues length='2'>
<string>virtio</string>
<string>scsi</string>
</enumValues>
<value>VIRTIO</value>
<defaultValue>VIRTIO</defaultValue>
</parameter>
</entry>
<entry>
<string>stratuslab.instance.type</string>
<parameter category='stratuslab' class='com.sixsq.slipstream.persistence.ModuleParameter' description='Cloud instance type' isSet='true' mandatory='true' name='stratuslab.instance.type' readonly='false' type='Enum'>
<enumValues length='7'>
<string>m1.small</string>
<string>c1.medium</string>
<string>m1.large</string>
<string>m1.xlarge</string>
<string>c1.xlarge</string>
<string>t1.micro</string>
<string>standard.xsmall</string>
</enumValues>
<value>M1_SMALL</value>
<defaultValue>M1_SMALL</defaultValue>
</parameter>
</entry>
<entry>
<string>hostname</string>
<parameter category='Output' class='com.sixsq.slipstream.persistence.ModuleParameter' description='hostname/ip of the image' isSet='false' mandatory='true' name='hostname' readonly='false' type='String'>
<value>123.234.345</value>
</parameter>
</entry>
<entry>
<string>stratuslab.cpu</string>
<parameter category='stratuslab' class='com.sixsq.slipstream.persistence.ModuleParameter' description='Requested CPUs' isSet='false' mandatory='true' name='stratuslab.cpu' readonly='false' type='String'></parameter>
</entry>
<entry> 
<string>stratuslab.ram</string>  
<parameter category='stratuslab' class='com.sixsq.slipstream.persistence.ModuleParameter' description='Requested RAM (in GB)' isSet='false' mandatory='true' name='stratuslab.ram' readonly='false' type='String'></parameter>
</entry>
<entry> 
<string>instanceid</string>  
<parameter category='Output' class='com.sixsq.slipstream.persistence.ModuleParameter' description='Cloud instance id' isSet='false' mandatory='true' name='instanceid' readonly='false' type='String'></parameter>
</entry>
<entry> 
<string>network</string>  
<parameter category='Cloud' class='com.sixsq.slipstream.persistence.ModuleParameter' description='Network type' isSet='true' mandatory='true' name='network' readonly='false' type='Enum'>
<enumValues length='2'>
<string>Public</string>
<string>Private</string>
</enumValues>
<value>Public</value>
<defaultValue>Public</defaultValue>
</parameter>
</entry>
</parameters>
<authz groupCreateChildren='false' groupDelete='false' groupGet='true' groupPost='false' groupPut='false' inheritedGroupMembers='true' owner='sixsq' ownerCreateChildren='true' ownerDelete='true' ownerGet='true' ownerPost='true' ownerPut='true' publicCreateChildren='false' publicDelete='false' publicGet='true' publicPost='false' publicPut='false'>
<groupMembers class='java.util.ArrayList'></groupMembers>
</authz>
<cloudNames length='2'>
<string>stratuslab</string>
<string>default</string>
</cloudNames>
<targets class='org.hibernate.collection.PersistentBag'>
<target name='execute' runInBackground='false'>execute target</target>
<target name='report' runInBackground='false'>report target</target>
</targets>
<packages class='org.hibernate.collection.PersistentBag'>
<package key='key' name='apache2' repository='repo'/>
</packages>
<prerecipe>some pre-recipe</prerecipe>
<recipe>some recipe</recipe>
<cloudImageIdentifiers class='org.hibernate.collection.PersistentBag'>
<cloudImageIdentifier cloudImageIdentifier='HZTKYZgX7XzSokCHMB60lS0wsiv' cloudServiceName='stratuslab' resourceUri='module/Public/BaseImages/Ubuntu/12.04/4/stratuslab'></cloudImageIdentifier>
<cloudImageIdentifier cloudImageIdentifier='abc' cloudServiceName='my-cloud' resourceUri='module/Public/BaseImages/Ubuntu/12.04/4/stratuslab'></cloudImageIdentifier>
</cloudImageIdentifiers>
<extraDisks class='org.hibernate.collection.PersistentBag'></extraDisks>
<user issuper='false' resourceUri='user/super' name='toto'></user>
</imageModule>")))
