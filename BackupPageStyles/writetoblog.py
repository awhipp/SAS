import time

date = time.strftime("%c")

with open("blogpost.txt") as file:
	post = file.readlines()

with open("blog.html") as file:
    content = file.readlines()

foundLine = 0
countLine = 0

for line in content:
	line.rstrip('\n')
	if foundLine == 1:
		content.insert(countLine,'<p>')
		countLine += 1
		title = 0
		for message in post:
			if title == 0:
				content.insert(countLine, '<h5>' + message + ' - ' + date + '</h5>\n')
				countLine += 1
				title = 1
				continue
			if '\n' in message:
				content.insert(countLine, message + '<br>')
			else:
				content.insert(countLine, message)
			countLine += 1
		content.insert(countLine, '</p>\n')
		foundLine = 0
	if "BlogPostHere" in line:
		foundLine = 1
	countLine += 1

file = open("blog.html",'w+')
for item in content:
  file.write("%s" % item)