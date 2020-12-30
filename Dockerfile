FROM httpd:2.4
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN mkdir /root/frontend
WORKDIR /root/frontend
COPY ./crud-frontend-angular /root/frontend
RUN apt-get -y update && apt-get -y install wget && apt-get -y install git
RUN wget -O- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
RUN source ~/.bashrc && nvm install 10.19.0 && npm install && npm run build -- --prod
RUN cp -R dist/teste-esig/* /usr/local/apache2/htdocs/