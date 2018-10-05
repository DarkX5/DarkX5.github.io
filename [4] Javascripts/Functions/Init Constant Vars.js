var color = {};
color.active = 0xff2f9ec2;
color.inactive = 0xff303030;

llVars = LL.getVariables(); 
llVars.edit()
 .setInteger("ColorActive", color.active)
 .setInteger("ColorInactive", color.inactive)
.commit();